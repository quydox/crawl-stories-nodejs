import Base from 'models/BaseModel'

module.exports = (sequelize, DataTypes) => {
  class StorySource extends Base {};

  StorySource.init({
    id: {
      type: DataTypes.TINYINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    story_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    source_story_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    source_story_url: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'story_sources'
  })

  return StorySource
}
