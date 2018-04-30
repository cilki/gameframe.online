.PHONY: selenium postman frontend backend

## Environment Variables ##
export CACHE_GAMEFRAME=.

issues:
	@echo https://github.com/cilki/gameframe.online/issues

stories:
	@echo https://github.com/cilki/gameframe.online/projects/4

github:
	@echo https://github.com/cilki/gameframe.online/

uml:
	@echo https://github.com/cilki/gameframe.online/blob/master/docs/uml_diagram.png

selenium:
	@python selenium/TestSite.py

frontend:
	@npm run test

backend:
	@python -m unittest discover data

postman:
	@newman run postman/Postman.json -e postman/Postman.environment

website:
	@echo http://gameframe.online/

report:
	@echo https://cilki.gitbooks.io/report/

apidoc:
	@echo https://cilki.gitbooks.io/api/

self:
	@echo https://cilki.gitbooks.io/report/self-critique.html

other:
	@echo https://cilki.gitbooks.io/report/other-critique.html
