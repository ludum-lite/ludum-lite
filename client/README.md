# Pin library versions in package.json

```
  "eslint": "4.19.1",
  "rollup": "0.67.3",
```

# Update libraries

```
> vagrant ssh
> cd ./www
> npm install
```

# Add to hosts file on local machine and in vagrant

```
192.168.48.48 ludumdare.org
192.168.48.48 api.ludumdare.org
192.168.48.48 url.ludumdare.org
192.168.48.48 jammer.work
192.168.48.48 api.jammer.work
192.168.48.48 url.jammer.work
192.168.48.48 bio.jammer.work
192.168.48.48 api.bio.jammer.work
192.168.48.48 static.jammer.work
```

## Windows

C:\Windows\System32\drivers\etc\hosts

## Vagrant

```
> vagrant ssh
> sudo vim /etc/hosts
paste and save (esc to normal mode and :x!)
```

# Make

```
> vagrant ssh
> cd ./www
> make
```

# Simulate an event

```
> vagrant ssh
> ./www/sandbox/simulator/simulate_ld_event 50 actions
```

# Open the website

http://ludumdare.org/

# Helpful places

http://192.168.48.48/simulator/model_default
Outlines the phases of an event. Search `SetupThemePhase`
