module.exports = {  
    // 测试环境  
    testEnvironment: 'node',  
    
    // 文件转换配置  
    transform: {  
      '^.+\\.tsx?$': 'ts-jest'  
    },  
    
    // 测试文件匹配模式  
    testMatch: [  
      '**/__tests__/**/*.ts',  
      '**/?(*.)+(spec|test).ts'  
    ],  
    
    // 忽略的文件  
    testPathIgnorePatterns: [  
      '/node_modules/'  
    ],  
    
    // 覆盖率报告配置  
    collectCoverage: true,  
    coverageDirectory: 'coverage',  
    coverageReporters: ['text', 'lcov'],  
    
    // 模块映射  
    moduleNameMapper: {  
      '^@/(.*)$': '<rootDir>/src/$1'  
    } ,
    setupFiles: ["<rootDir>/src/testSetup.ts"]
  }