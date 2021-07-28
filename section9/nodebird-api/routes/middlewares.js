const jwt = require('jsonwebtoken');
const RateLimit = require('express-rate-limit');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    // 미들웨어 간의 데이터 전달 방식
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    console.log(req.decoded);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') { // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
};

exports.apiLimiter = new RateLimit({
  windowMs: 60 * 1000, // 해당 시간 내에
  max: 10, // 최대 max 번까지만 요청 가능
  delayMs: 0, // 요청의 간격은 delayMs 이상
  handler(req, res) {
    res.status(this.statusCode).json({ // code : 429
      code: this.statusCode,
      message: '1분에 열 번만 요청할 수 있습니다.'
    });
  },
});

exports.deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: '새로운 버전이 나왔습니다. 새로운 버전을 사용하세요.'
  });
}