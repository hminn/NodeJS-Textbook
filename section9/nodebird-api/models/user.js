const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        // 유저가 설정하는 pwd는 100자 보다 훨씬 적은 길이이지만,
        // 나중에 패스워드를 암호화할 때(해싱할 때) 길어지므로 넉넉하게 길이를 설정해준다.
        // SNS로 로그인할 때는 비밀번호가 없을 수 있기 때문에 allowNull: true
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: {
        // 로그인 제공자
        // 'local'은 NodeBird를 통해 로그인 한 것, 'kakao'는 카카오를 통해 로그인 한 것
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        // 이후 카카오와 같은 SNS를 이용하여 로그인을 하는 경우, SNS의 아이디를 알고있어야 SNS으로 로그인이 가능하게 된다.
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true, // 생성, 삭제, 수정 시간을 기록
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true, // 소프트 삭제를 허용
      charset: 'utf8', // 한글 지원
      collate: 'utf8_general_ci'
    });
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Domain);
    db.User.belongsToMany(db.User, {
      // foreignKey를 설정한 이유는 누가 팔로워ID 이고, 누가 팔로잉ID 인지 구별해주기 위해서.
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
    db.User.belongsToMany(db.Post, {
      foreignKey: 'userId',
      as: 'LikePosts',
      through: 'UserLikePost'
    })
  }
};