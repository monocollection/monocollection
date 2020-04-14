# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "mozodev/xenial64-anyenv"
  config.vm.hostname = "monocollection"
  config.vm.network "private_network", ip: "192.168.34.12"
  config.vm.network "forwarded_port", guest: 4000, host: 4000, id: "jekyll"
  config.vm.synced_folder ".", "/vagrant", type: 'nfs', fsnotify: true

  config.vm.provider "virtualbox" do |vb|
    vb.name = "monocollection"
    vb.cpus = 2
    vb.memory = "2048"
    vb.linked_clone = true
  end

  config.vm.provision 'shell', keep_color: true, privileged: false, inline: <<-SHELL
    echo 'alias jks="jekyll serve -H 0.0.0.0 -P 4000"' >> ~/.bash_profile
    anyenv install pyenv && . ~/.bash_profile
    pyenv install 3.8.2 && pyenv global 3.8.2
    pip install --upgrade pip && pip install python-slugify[unidecode] pillow
    curl -LO https://github.com/jarun/imgp/releases/download/v2.7/imgp_2.7-1_ubuntu16.04.amd64.deb
    sudo apt -y install ./imgp_2.7-1_ubuntu16.04.amd64.deb && rm ./imgp_2.7-1_ubuntu16.04.amd64.deb
    sudo cp /vagrant/slugify_files.py /usr/local/bin/slugify_files
  SHELL

  # https://www.vagrantup.com/docs/vagrantfile/vagrant_settings.html#config-vagrant-plugins
  config.vagrant.plugins = "vagrant-fsnotify"
  # https://github.com/adrienkohlbecker/vagrant-fsnotify
  config.trigger.after :up do |t|
    t.name = "vagrant-fsnotify"
    t.run = { inline: "vagrant fsnotify" }
  end

end
