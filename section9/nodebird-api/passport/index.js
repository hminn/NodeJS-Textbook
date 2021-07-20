const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  // 메모리의 효율성을 위해 구현

  passport.serializeUser((user, done) => {
    done(null, user.id);
    // 서버 메모리를 최대한 가볍게 만들기 위해 user의 id만 세션에 저장.
    // 사실, 실무에서는 메모리에도 저장하면 안된다. ex) 페이스북의 수억명의 사용자의 경우
    // 나중에 메모리 저장용 DB를 따로 구성한다 (15장에서)
    // { id: 3, 'connect.sid': s%3189203810391280 } 와 같은 형태로 메모리에 저장.
    // 'connect.sid' 는 세션 쿠키, 세션 쿠키는 브라우저로 보내진다.
    // 브라우저에서 요청을 보낼 때 세션 쿠키도 함께 넣어 보내고, 서버는 요청과 함께 받은 쿠키 정보를 가지고 유저의 id를 찾는다.
    // 찾은 유저 id를 가지고 deserialize 과정을 통해 유저 데이터를 복구하는 흐름이다.
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [{
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followers',
      }, {
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followings',
      }],
    })
    // req.user(유저 정보)는 deserializeUser에서 생성됨을 기억하자!
    // then으로 들어가 done(null, user)를 호출하게 되면 req를 통해 유저 정보로 접근이 가능하다
    // 접근은 req.user로 할 수 있다.
      .then( user => done(null, user))
      .catch( err => done(err));
  });

  local(); // localStartegy 등록
  kakao(); // kakaoStartegy 등록
}