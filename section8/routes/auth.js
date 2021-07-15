const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

// 회원가입 라우터
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    // 기존에 해당 이메일로 가입된 유저가 있는지 체크
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      // 유저가 존재한다면 회원 가입페이지로 되돌려보낸다.
      // 단, 발생한 에러를 쿼리스트링으로 표시.
      return res.redirect('/join?error=exist');
    }
    // 비밀번호를 bcrypt를 이용하여 해시화.
    // 인자로 넣어주는 12는 해시 복잡도에 대한 수치이다.
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  // passport.authenticate('local') 을 실행하면, passport에 등록해놓은 localStartegy가 실행이 된다.
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      // 이 과정에서 세션 쿠키를 브라우저로 보내준다.
      // 브라우저로 redirect 되는 순간 브라우저에 세션 쿠키가 저장된다.
      // 그 다음 요청부터는 세션 쿠키가 보내져서 요청을 누가 보냈는지 체크할 수 있는 것이다.
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;