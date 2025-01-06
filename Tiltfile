## SPeeDI Web Tiltfile
##
## Peter Hammans <peter.hammans@hdruk.ac.uk>
##

cfg = read_json("tiltconf.json")

docker_build(
    ref="hdruk/" + cfg.get("name"),
    context=".",
    live_update=[
        sync("./src", "/usr/src/src"),
        sync("./public", "/usr/src/public"),
        run("npm install", trigger="./package-lock.json"),
    ],
    dockerfile="./Dockerfile.dev",
)

print("Service name from tiltconf.json:", cfg.get("name"))

k8s_yaml("chart/" + cfg.get("name") + "/" + "deployment.yaml")
k8s_yaml("chart/" + cfg.get("name") + "/" + "service.yaml")

k8s_resource(cfg.get("name"), port_forwards=3000, labels=["Web"])

# k8s_resource(cfg.get("name") + "-service", port_forwards=30000)
