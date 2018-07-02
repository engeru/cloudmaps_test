/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var crypto = require('crypto');

module.exports = {

  profile: function(req, res){
    User.findOne({
      username: req.param('username')
    }).exec(function(error, user){
      if(error){
        res.view('user/error',{message: 'Ошибка: ' + error.message});
      }
      else{
        res.view({
          user: _.omit(user, 'password')
        });
      }
    });
  },

  avatar: function(req, res){
    var fs = require('fs');
    //sails.config.rootPath
    var avatar_dir =  'C:\\Users\\Alexei\\Workspace\\cloudmaps_test' + '/avatars/';
    if(req.method == 'GET'){
      var avatar = avatar_dir + req.param('id') + '.jpg';
      fs.stat(avatar, function(error, stats){
        if(error){
          return res.sendfile(avatar_dir + 'default-avatar.jpg');
        }
        else if(stats.isFile()){
          return res.sendfile(avatar);
        }
        else{
          return res.notFound();
        }
      });
    }
    else if(req.method == 'POST'){
      console.log('asdasdasdsa');
      req.file('file').upload({}, function(error, files){
        console.log('HUUUUUUS',files);
        if(error)
          return res.negotiate(error);
        else{
          fs.rename(files[0].fd, avatar_dir+req.session.user.id+'.jpg', function(error){
            if(error)
              return res.negotiate(error);
            else
              return res.ok();
          });
        }

      });
    }
  },
};

