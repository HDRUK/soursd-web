## SPeeDI Web Tiltfile
##
## Peter Hammans <peter.hammans@hdruk.ac.uk>
##

cfg = read_json("tiltconf.json")

docker_build(
    ref="hdruk/" + cfg.get("name"),
    context=".",
    ignore=["./node_modules/.cache/storybook/**"],
    live_update=[
        sync("./src", "/usr/src/src"),
        sync("./public", "/usr/src/public"),
        sync("./mocks", "/usr/src/mocks"),
        run("npm install", trigger="./package-lock.json"),
    ],
    dockerfile="./Dockerfile.dev",
)


k8s_yaml("chart/" + cfg.get("name") + "/" + "deployment.yaml")
k8s_yaml("chart/" + cfg.get("name") + "/" + "service.yaml")

k8s_resource(cfg.get("name"), port_forwards=3000, labels=["Web"])
