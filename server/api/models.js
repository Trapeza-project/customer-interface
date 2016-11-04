// These models/database tables should be placed and implemented in the appropriate endpoint

'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Whitelist', {
    infoid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accessid:{ 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    personid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
}

export default function(sequelize, DataTypes) {
  return sequelize.define('Accessrights', {
    infoid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accessright:{ 
      type: DataTypes.ENUM('none','limited','all'),
	  defaultValue: 'none',
      allowNull: false
    },
    personid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
}

export default function(sequelize, DataTypes) {
  return sequelize.define('Infonames', {
    infoid: {
      type: DataTypes.INTEGER,
	  primaryKey: true,
      allowNull: false
    },
    infoname: DataTypes.STRING,
    infotype: DataTypes.STRING,
	price: DataTypes.INTEGER
  });
}

export default function(sequelize, DataTypes) {
  return sequelize.define('Requestlog', {
	requestid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
	accessid: DataTypes.INTEGER,
	personid: DataTypes.INTEGER,
	infoids: DataTypes.ARRAY(DataTypes.INTEGER),
	pending: DataTypes.BOOLEAN,
	allow: DataTypes.BOOLEAN,
	timestamp: DataTypes.TIME,
	purpose: DataTypes.STRING,
	price: DataTypes.INTEGER
  });
}

export default function(sequelize, DataTypes) {
  return sequelize.define('Datalog', {
	personid: DataTypes.INTEGER,
	infoid: DataTypes.INTEGER
	timestamp: DataTypes.TIME,
	provider: DataTypes.STRING,
	selfupload: DataTypes.BOOLEAN,
	validation: DataTypes.STRING
  });
  
export default function(sequelize, DataTypes) {
  return sequelize.define('Financial', {
	personid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
	incomemonth: DataTypes.INTEGER,
	incomeyear: DataTypes.INTEGER
  });
}

export default function(sequelize, DataTypes) {
  return sequelize.define('Personal', {
	personid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
	firstname: DataTypes.STRING,
	lastname: DataTypes.STRING,
	address: DataTypes.STRING,
	city: DataTypes:STRING,
	zipcode: DataTypes.STRING
  });
}

export default function(sequelize, DataTypes) {
  return sequelize.define('Accessornames', {
	id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
	name: DataTypes.STRING,
	trustscore: DataTypes.DECIMAL
  });
}

export default function(sequelize, DataTypes) {
  return sequelize.define('Customerlogin', {
	// See user.model
  });
}

export default function(sequelize, DataTypes) {
  return sequelize.define('Tablemapper', {
	infoid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
	column: DataTypes.STRING,
	table: DataTypes.STRING
  });
}

export default function(sequelize, DataTypes) {
  return sequelize.define('Pendingrequest', {
	requestid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
	accessid: DataTypes.INTEGER,
	personid: DataTypes.INTEGER,
	infoids: DataTypes.ARRAY(DataTypes.INTEGER),
	timestamp: DataTypes.TIME
  });
}

export default function(sequelize, DataTypes) {
  return sequelize.define('PreviousRequest', {
	requestid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
	infoids: DataTypes.ARRAY(DataTypes.INTEGER)
	timetolive: DataTypes.INTEGER,
	allow: DataTypes.BOOLEAN,
	companyapprove: DataTypes.BOOLEAN,
	companypending: DataTypes.BOOLEAN,
	data: DataTypes.TEXT
  });
}


export default function(sequelize, DataTypes) {
  return sequelize.define('Modulesettings', {
	infoids: DataTypes.ARRAY(DataTypes.INTEGER)
	active: DataTypes.BOOLEAN,
	UCHandle: DataTypes.BOOLEAN
  });
}



// OBS ADMINDATABASE

export default function(sequelize, DataTypes) {
  return sequelize.define('Adminlog', {
	infoid: DataTypes.INTEGER,
	personid: DataTypes.INTEGER,
	username: DataTypes.STRING,
	timestamp: DataTypes.TIME
  });
}

export default function(sequelize, DataTypes) {
  return sequelize.define('Adminlogin', {
	// See e.g user.model
  });
}