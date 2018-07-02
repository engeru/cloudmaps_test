/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var crypto = require('crypto');

module.exports = {

  register: function(req, res){
    console.log('UNDERLINE',_);
    if(req.method == 'POST'){
      var model = req.allParams();
      model.password = crypto.createHash('sha256').update(model.password).digest('hex');
      delete model.id;
      User.create(model, function(error, data){
        if(error){
          res.view('user/error', {message: 'При регистрации пользователя произошла ошибка: ' + error.message});
        }
        else{
          var nodemailer = require('nodemailer');
          var smtpTransport = require('nodemailer-smtp-transport');
          var transporter = nodemailer.createTransport(smtpTransport({
              host: 'localhost',
              port: 25,
              ignoreTLS: true
            })
          );
          var mailOptions ={
            from: 'test@cloudmaps.ru' ,
            to: model.email,
            subject: 'User Activation Email',
            text: 'http://localhost:1337/user/register/?id='+data.id+'&t='+model.password
          };
          transporter.sendMail(mailOptions, function(error, info){
            if(error){
              res.view('user/error', {message: 'При регистрации пользователя произошла ошибка: ' + error.message});
            }
            else res.view('user/after_register');
          });
        }
      });
    }
    else if(req.method == 'GET'){
      if(req.param('id') && req.param('t')){
        var id = parseInt(req.param('id')),
            token = req.param('t');
        User.findOne(id).exec(function(error,user){
          if(error){
            res.view('user/error',{message: 'При активации пользователя произошла ошибка: ' + error.message});
          }
          else{
            if(user.password == token){
              User.update(id, {active: true}).exec(function(error){
                if(error){
                  res.view('user/error',{message: 'При активации пользователя произошла ошибка: ' + error.message});
                }
                else{
                  res.redirect('/login');
                }
              });
            }
            else{
              res.view('user/error',{message: 'При активации пользователя произошла ошибка: неверный ключ активации'});
            }
          }
        });
      }
      else{
        res.view();
      }
    }
  },

  login: function(req, res){
    if(req.method == 'POST'){
      User.findOne({username: req.param('username')}).exec(function(error, user){
        if(error){
          res.view('user/error',{message: 'При проверке логина и пароля произошла ошибка: ' + error.message});
        }
        else if(!user){
          res.view('user/error',{message: 'Ошибка: пользователь не существует'});
        }
        else{
          if(user.password == crypto.createHash('sha256').update(req.param('password')).digest('hex')){
            req.session.user = user;
            if(user.active){
              return res.redirect('/user/'+user.username);
            }
            else{
              res.view('user/error', {message: 'Аккаунт пользователя не активирован, проверьте электронную почту или перейлите по ссылке (http://localhost:1337/activate) для повторной отправки письма.'});
            }
          }
          else{
            res.view('user/error',{message: 'Неверный логин или пароль'});
          }
        }
      });
    }
    else{
      if(typeof req.session.user == 'undefined'){
        return res.view();
      }
      else{
          return res.redirect('/user/' + req.session.user.username);
      }
    }
  },

  logout: function(req, res){
    delete req.session.user;
    return res.redirect('/');
  },

  activatePage: function(req, res){
    res.view('user/activate', {link: req.session.user});
  },

  activate: function(req, res){
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');

    var transporter = nodemailer.createTransport(smtpTransport({
      host: 'localhost',
      port: 25,
      ignoreTLS: true
    })
    );
    var mailOptions ={
      from: 'test@cloudmaps.ru' ,
      to: req.session.user.email,
      subject: 'User Activation Email',
      text: 'http://localhost:1337/user/register/?id=' + req.session.user.id + '&t='+req.session.user.password
    };
    transporter.sendMail(mailOptions, function(error, info){
    if(error){
      res.view('user/error', {message: 'При регистрации пользователя произошла ошибка: ' + error.message});
    }
    else res.view('user/after_register');
    });
  },
};

