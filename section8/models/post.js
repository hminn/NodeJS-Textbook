const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      img: {
        // 이런 식으로 작성하면 이미지는 1개만 작성 가능
        // 이미지를 2개 이상 올리려면, 이미지 테이블을 만들어서 게시물과 이미지를 1:N 관계를 만들어야한다.
        type: Sequelize.STRING(200),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false, // 하드 딜리트
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4', // 한글과 이모티콘을 지원
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  }
};