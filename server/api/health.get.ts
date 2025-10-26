export default defineEventHandler(async (event) => {
  // Set proper headers
  setHeader(event, 'Content-Type', 'application/json')
  setHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate')
  
  try {
    // Basic health check
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: 'unknown',
        redis: 'unknown'
      }
    }
    
    // Check database connection
    try {
      const { query } = await import('../utils/db')
      await query('SELECT 1')
      healthStatus.services.database = 'healthy'
    } catch (error) {
      healthStatus.services.database = 'unhealthy'
      healthStatus.status = 'degraded'
    }
    
    // Check Redis connection (if available)
    try {
      // Add Redis health check here if Redis is implemented
      healthStatus.services.redis = 'not_implemented'
    } catch (error) {
      healthStatus.services.redis = 'unhealthy'
    }
    
    // Return appropriate status code
    const statusCode = healthStatus.status === 'healthy' ? 200 : 503
    
    return {
      ...healthStatus,
      statusCode
    }
  } catch (error) {
    console.error('Health check error:', error)
    
    setResponseStatus(event, 503)
    return {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      statusCode: 503
    }
  }
})
