echo "Do you want to deploy to prod (y/n)? (default to 'staging')";
read answer;

if [ "$answer" != "${answer#[Yy]}" ] ;then
  env="prod";
else
  env="staging";
fi

# build
yarn --cwd src build-$env;
# rsync -rv --exclude='node_modules' src functions;
# yarn --cwd functions install;

# deploy
firebase use $env;
firebase deploy;
