const db = require('../config/db.config.js');
const fs = require('fs')
const Instance = db.instance
const Groups = db.group
const Cron = db.cronjob
const git = db.git
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const env = require('../config/env.js');
const {CronJob} = require('cron');
const CronTime = require('cron').CronTime;
let timer = '* 0 * * * *';
let git_settings = '';

const backupJob = new CronJob(
	timer, // cronTime
	function() {
        sch()
    }, // onTick
    null,
    false,
	env.tz // timeZone
);

const checkTimer = new CronJob('*/10 * * * * *', () => {
    Cron.findOne({where: {active: true}}).then(async (resp) => {
        if(resp != null && backupJob.running == false) {
            backupJob.start()
            console.log('Start Job')
        }else if(resp == null) {
            backupJob.stop()
            console.log('Stop Job')
        }else if(resp.job !== timer && resp !=null) {
            timer = resp.job;
            backupJob.setTime(new CronTime(timer, env.tz))
            console.log('Change time: ',timer, env.tz)
        }
    })
});

checkTimer.start();

async function sch() {
        try {
            try{
                if (!fs.existsSync('backup')) {
                    fs.mkdirSync('backup')
                };
                await git.findOne().then(async (resp) => {
                    if(resp !=null) {
                        git_settings = resp
                    } else {
                        console.log('Failed get git settings')
                    }
                })
                if(fs.readdirSync('backup').length == 0){
                    await exec(`cd backup; 
                        git clone https://${git_settings.username}:${git_settings.password}@${git_settings.url} . &&
                        git config user.name "${git_settings.fullname}" &&
                        git config user.email "${git_settings.email}" && git switch --create main`);
                } else {
                    await exec(`cd backup && git fetch && git pull`);
                };
            }catch{

            }
            try {
                await exports.makeBackup()
                    gitPush();
                
            } catch (e) {
                    console.log(e)
            }
            
            
        } catch (err) {
            console.log('Error with git: ' + err)
        }
}
    
function gitPush() {
    exec(`cd backup && git add . && git commit -m 'Backup finihed at ${new Date().toLocaleString('en-US', {timeZone: 'Europe/Moscow'})}' && git push --force`, ((error, stdout, stderr) => {
        if(stdout) {
            console.log(stdout)
        }        
        if(stderr) {
                    console.log(stderr)
                }
                if(error) {
                    console.log(error)
                }
            }));
} 

exports.makeBackup = () => {
    return new Promise(async (resolve) => {
        await Instance.findAll({where: {active: true},raw: true}).then(async (resp) => {              
            for await (const el of resp) {
                let groupName = '';
                groupName = await Groups.findOne({where: {id: el.group},raw: true})
               if (!fs.existsSync('backup/' + groupName.name + '/' + el.name)) {
                   fs.mkdirSync('backup/' + groupName.name + '/' + el.name, {recursive: true})
               };
               try {
                   await exec(`sshpass -p ${el.password} ssh -p ${el.sshport} -o StrictHostKeyChecking=no ${el.login}@${el.address} '/system backup save name=backup; export verbose file=backup.rsc'`)
                   .then((resp) => {
                       console.log(resp)
                   });
                   await exec(`sshpass -p ${el.password} scp -P ${el.sshport} ${el.login}@${el.address}:/backup.backup backup/${groupName.name}/${el.name}/; 
                       sshpass -p ${el.password} scp -P ${el.sshport} ${el.login}@${el.address}:/backup.rsc backup/${groupName.name}/${el.name}/`).then((resp) => {
                   });
                    Instance.update({laststatus: true},{where: {id:el.id}});
               } catch {
                   console.log('Error with connection to instance - ' + el.name);
                    Instance.update({laststatus: false},{where: {id:el.id}});
               };
           };
        });
        resolve();
    });
};
