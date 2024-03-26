## Gateway Web Tiltfile
##
## Loki Sinclair <loki.sinclair@hdruk.ac.uk>
##

cfg = read_json('tiltconf.json')

docker_build(
    ref='hdruk/' + cfg.get('name'),
    context='.',
    live_update=[
        sync('.', '/usr/src'),
        run('npm install', trigger='./package-lock.json')
    ],
    dockerfile='./Dockerfile.dev'
)

k8s_yaml('chart/' + cfg.get('name') + '/' + cfg.get('name') + '.yaml')
k8s_resource(
    cfg.get('name'),
    port_forwards=3000
)