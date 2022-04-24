import Base from 'models/BaseModel'

module.exports = (sequelize, DataTypes) => {
  class Story extends Base {};

  Story.init({
    id: {
      type: DataTypes.TINYINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cat_id1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cat_id2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cat_id3: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    rates: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    rate_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    short_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    chapters: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    last_chapter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    comments: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'stories'
  })

  return Story
}
