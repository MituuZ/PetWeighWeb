# Pet Weights Web
A flask app that serves a website that is used to log weights to a LiteDB database with HTTP calls.

Note! Before deployment check that the `raspIp` variable is set correctly in the script.js file

## Nohup deployment
The app is deployed on localhost:8080 (configured on app.py)
```
# Can be run in the application folder, but you should include the project path e.g. /home/user/PetWeightsWeb/app.py > /home/user/PetWeightsWeb/log.txt

sudo nohup python app.py > log.txt 2>&1 &
```

[Breakdown](https://stackoverflow.com/questions/36465899/how-to-run-flask-server-in-the-background):
```
nohup allows to run command/process or shell script that can continue running in the background after you log out from a shell.

> log.txt: it forword the output to this file.

2>&1: move all the stderr to stdout.

The final & allows you to run a command/process in background on the current shell.
```

## Shutdown
The grep here should match the deployment path, as the deployment command is used to find the correct process.
If you included the full path above you should do it here as well.
```
# Get the PID
# grep -v 'grep' wont show the grep command itself on the process list
ps -aux | grep 'nohup python <path-to-app>/PetWeighWeb/app.py' | grep -v 'grep' | awk '{print $2}'

# Kill the process
kill <PID>

# Shortcut
kill $(ps -aux | grep 'nohup python <path-to-app>/Projects/PetWeighWeb/app.py' | grep -v 'grep' | awk '{print $2}')
```

## Functions
I created some bash functions to make controlling easier, you can add these to your bash conf e.g. ~/.bashrc or ~/.bash_profile

Replace \<path-to-app> with the actual value
```
function petweb-start() {
  sudo nohup python <path-to-app>/PetWeighWeb/app.py > <path-to-app>/PetWeighWeb/log.txt 2>&1 &
}

function petweb-stop() {
  kill $(ps -aux | grep 'nohup python <path-to-app>/PetWeighWeb/app.py' | grep -v 'grep' | awk '{print $2}')
}

function petweb-running() {
  ps -aux | grep 'nohup python <path-to-app>/PetWeighWeb/app.py' | grep -v 'grep' | awk '{print $2}'
}

function petweb-reload() {
  kill $(ps -aux | grep 'nohup python <path-to-app>/PetWeighWeb/app.py' | grep -v 'grep' | awk '{print $2}')
  wait
  sudo nohup python <path-to-app>/PetWeighWeb/app.py > <path-to-app>/PetWeighWeb/log.txt 2>&1 &
}
```
