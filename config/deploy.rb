# config valid only for current version of Capistrano
lock '3.4.0'

set :repo_url, 'git@bitbucket.org:abottazini/aurelienbottazini.com.git'
# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp
set :branch, :master
# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/home/deploy/aurelienbottazini.com'

# Default value for :scm is :git
set :scm, :git

# Default value for :format is :pretty
set :format, :pretty

# Default value for :log_level is :debug
set :log_level, :debug

set :application, 'aurelienbottazini.com'
set :name, "dulcet-palace-105616/#{fetch(:application)}"
set :remote_repo, "eu.gcr.io/#{fetch(:name)}"

task :build do
  system "docker build -t #{fetch(:remote_repo)} ."
end

task :push do
  system "gcloud docker push #{fetch(:remote_repo)}"
end

desc 'go'
task :go => ['build', 'push', 'deploy']

desc 'deploy'
task :deploy do
  on roles(:app) do
    execute "/home/deploy/google-cloud-sdk/bin/gcloud docker pull #{fetch(:remote_repo)}"
    Rake::Task['deploy:restart'].invoke
  end
end

namespace :deploy do
  task :restart do
    on roles(:app) do
      execute 'mkdir -p /home/deploy/aurelienbottazini.com'
      system "scp ../secrets/aurelienbottazini.com/docker-compose.yml deploy@ns395832.ip-176-31-103.eu:#{fetch(:deploy_to)}/docker-compose.yml"
      execute 'cd /home/deploy/aurelienbottazini.com && docker-compose stop'
      execute 'cd /home/deploy/aurelienbottazini.com && docker-compose up -d'
    end
  end
end