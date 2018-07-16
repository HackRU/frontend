# Guidelines for Contributing

1.  [RTFH](#rtfh)
2.  [Naming Your Feature Branch](#naming-your-feature-branch)
3.  [Naming Your Variables](#naming-your-variables)
4.  [Style Guide](#style-guide-heman-is-an-occupational-hazard-and-we-need-linters)

## RTFH
**Make sure you read the**[handbook!](https://github.com/HackRU/handbook/blob/master/architects.md)
**Make sure to watch the repo so you can get notified of updates!**

## Naming Your Feature Branch

Please keep your branch naming consistent - as much as possible, one word, all lower-case, no numbers or special symbols.  If you must use more than one word, use dashes: like-this-branch.

Make sure you don't accidentally push to master!  Use a [git hook](https://blog.ghost.org/prevent-master-push/) if you must.

```
#!/bin/bash

protected_branch='master'
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [ $protected_branch = $current_branch ]
then
    read -p "You're about to push master, is that what you intended? [y|n] " -n 1 -r < /dev/tty
    echo
    if echo $REPLY | grep -E '^[Yy]$' > /dev/null
    then
        exit 0 # push will execute
    fi
    exit 1 # push will not execute
else
    exit 0 # push will execute
fi
```


## Naming your Variables

In general, we don't really have a strict style ruling for this.  Please view the various files to get the idea.

*  For variables, we generally use `camelCase`
*  For action types, we generally use `SCREAMING_SNAKE_CASE`

## Style Guide (Heman is an occupational hazard and we need linters)

So the thing is ~~I am a huge fan of anarchy and using tabs~~ I've only worked on smaller projects, where linters weren't as important as a general sense of consistency.  A style guide here for a project like this is necessary.
We will likely be using something custom, with enough rules to make code uniform and easy to review, but without so many rules that it's a hassle for us to read or write anything.  

We will use eslint to enforce our practice, and I have included a .eslintrc file in the project root to configure it.  
If you use vim, I recommend using Syntastic, which is a syntax-checking plugin.  Here's how to get it up and running and configured properly:

1.  Get Pathogen for vim: `mkdir -p ~/.vim/autoload ~/.vim/bundle && \
curl -LSso ~/.vim/autoload/pathogen.vim https://tpo.pe/pathogen.vim` (Pathogen is good for lots of plugins, not just this one)
2.  Inside your `.vimrc` file (If you don't have one for whatever reason just make one in your home folder) add `execute pathogen#infect()`.
3.  Add Syntastic to vim: `cd ~/.vim/bundle && \
git clone --depth=1 https://github.com/vim-syntastic/syntastic.git` then check that `:Helptags` in vim doesn't return an error.  You can read the docs using `:help Syntastic`.
4.  Inside `.vimrc` add the following (this is my setup, it might not be exactly the same for yours): 
```
" syntax things
syntax on
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0

" linting
let g:syntastic_javascript_checkers = ['eslint']


let g:syntastic_javascript_eslint_exe = '$(npm bin)/eslint'

highlight link SyntasticErrorSign SignColumn
highlight link SyntasticWarningSign SignColumn
highlight link SyntasticStyleErrorSign SignColumn
highlight link SyntasticStyleWarningSign SignColumn

filetype off
filetype plugin indent on
```
5.  Go back to this project directory and install eslint globally with `npm install -g eslint`.  To explain what's going on, in the previous step, we tell vim that syntastic will use eslint as a javascript syntax-checker.  For this to work, a global install of eslint needs to be available by default.  We override this by designating the `exe` as `$(npm bin)/eslint`.  Now when eslint is used, it will look for the local eslint for the project directory.
6.  This should be enough, because you already have `.eslintrc` inside the project root and should have installed the necessary dependencies when you first used `npm install` above.  However, things can go wrong, as they always do with Node.  In such cases:
-   Check that the right eslint version is called: `$(npm bin)/eslint <some .js file>`
-   Check that eslint is configured with our `.eslintrc` and not something else: `$(npm bin)/eslint --print-config <some .js file>`
-   Check that the right linter is used by opening a `.js` file in vim and calling `:SyntasticInfo`
-   Debug Syntastic output in vim if necessary: `:let g:syntastic_debug=3`,`SyntasticCheck eslint`, `:mes`

