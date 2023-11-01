# Pet Weights Web
A flask app that serves a LAN website that is used to log weights to a LiteDB database with HTTP calls.

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

# Flask

Flask is a lightweight WSGI web application framework. It is designed to make getting started quick and easy, with the ability to scale up to complex applications.

Website: https://palletsprojects.com/p/flask/
License: BSD-3-Clause
Copyright: 2010 by Pallets

BSD-3-Clause License:  
Copyright 2010 Pallets

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
