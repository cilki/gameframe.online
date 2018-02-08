# gameframe.online

Development site: (http://dev.gameframe.online)<br>
Production site: (http://gameframe.online)

##### Docker Setup
Download the development image:
```
sudo docker pull cilki/gameframe:latest
```

Launch the container, replacing `<repo>` with the path to the repository:
```
sudo docker run -it -p 80:80 -v <repo>:/app cilki/gameframe:latest
```

Navigate to `localhost`. The container will automatically reload the server when you make a change in the code ;).
