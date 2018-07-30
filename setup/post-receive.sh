#!/usr/bin/env bash
echo "##### post-receive hook #####"
read oldrev newrev refname
echo "Push triggered update to revision $newrev ($refname)"

CMD_CD="cd $(readlink -nf "$PWD/..")"
CMD_FETCH="env -i git fetch"
CMD_COMPOSER="sudo -u www-data composer install --no-dev 2>&1"
CMD_MIGRATE="sudo -u www-data php artisan migrate --force"
CMD_NPM_BUILD="sudo -u www-data npm run prod"

echo "$ $CMD_CD"
eval ${CMD_CD}
echo "$ $CMD_FETCH"
eval ${CMD_FETCH}
echo "$ $CMD_COMPOSER"
eval ${CMD_COMPOSER}
echo "$ $CMD_MIGRATE"
eval ${CMD_MIGRATE}
echo "$ $CMD_NPM_BUILD"
eval ${CMD_NPM_BUILD}

echo "##### end post-receive hook #####"
