echo "Do you want to build for prod (y/n)?"
read answer

if [ "$answer" != "${answer#[Yy]}" ] ;then
  env="prod";
  firebase use prod;
else
  env="staging";
  firebase use staging;
fi

yarn clean;
webpack --env=$env;
