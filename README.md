# monocollection

Contemporary Korean Design:
Pattern,Fabric,Textile Design/Identity Consultation/Softerior

## develop

```zsh
$ vagrant up
$ vagrant ssh
$ cd /vagrant/ && jekyll s -H 0.0.0.0 -P 4000
```

```zsh
$ python3 --version
$ curl https://bootstrap.pypa.io/get-pip.py | python3
$ export PATH=$HOME/.local/bin:$PATH
$ pip install python-slugify imgp

# 이미지 파일명 및 최적화
$ slugify_files {target_dir}
# square-full
$ imgp -wracx 1500x1500 {target_dir}
# thubnail
$ imgp -wracx 610x610 {target_dir}
```

