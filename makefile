
all:
	@echo "make deploy 		Send current dist directory to remote"

deploy:
	rsync -r --delete dist/* techplex@blake.metheus.org:/var/www/team5122/easyj2