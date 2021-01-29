USE [master]
GO
IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'SportsBetting')
BEGIN
	CREATE DATABASE [SportsBetting]
END
GO
USE [SportsBetting]
GO
--You need to check if the table exists
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Event' and xtype='U')
BEGIN
	CREATE TABLE [dbo].[Event](
		[EventID] [int] IDENTITY(1,1) NOT NULL,
		[EventName] [nvarchar](500) NOT NULL,
		[OddsForFirstTeam] [float] NOT NULL,
		[OddsForDraw] [float] NOT NULL,
		[OddsForSecondTeam] [float] NOT NULL,
		[EventStartDate] [datetime] NOT NULL,
	PRIMARY KEY CLUSTERED 
	(
		[EventID] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
END
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='UserInfo' and xtype='U')
BEGIN
	CREATE TABLE [dbo].[UserInfo](
		[UserId] [int] IDENTITY(1,1) NOT NULL,
		[FirstName] [varchar](30) NOT NULL,
		[LastName] [varchar](30) NOT NULL,
		[UserName] [varchar](30) NOT NULL,
		[Email] [varchar](50) NOT NULL,
		[Password] [varchar](20) NOT NULL,
		[CreatedDate] [datetime] NOT NULL,
	PRIMARY KEY CLUSTERED 
	(
		[UserId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]

	ALTER TABLE [dbo].[UserInfo] ADD  DEFAULT (getdate()) FOR [CreatedDate]
END
GO
INSERT INTO UserInfo(FirstName, LastName, UserName, Email, Password) 
VALUES ('SportsBetting', 'Admin', 'ISportsBettingAdmin', 'SportsBettingAdmin@abc.com', '$admin@2021')
GO
INSERT INTO [dbo].[Event]([EventName],[OddsForFirstTeam],[OddsForDraw],[OddsForSecondTeam],[EventStartDate])
VALUES
('Liverpool - Juventus', 1.20, 1.06, 2, '2021-02-03 18:30:00'),
('Kubrat Pulev - Anthony Joshua', 2.26, 1.5, 1.03, '2021-12-23 20:00:00'),
('Barcelona - Ludogorec', 1.65, 5.65, 4, '2021-01-13 12:45:00')
GO
