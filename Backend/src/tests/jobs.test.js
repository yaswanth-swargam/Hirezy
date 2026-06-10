import request from 'supertest'
import app from '../app.js'
import pool from '../config/db.js'

// Step 1 — we need a logged-in user to test jobs
// because /api/jobs is a protected route (needs auth cookie)

const testUser = {
    email: 'testuser123@gmail.com',
    password: 'test1234'
}

let authCookie = '' // we'll store cookie after login

// Step 2 — before ALL tests run, login first
beforeAll(async () => {
    const res = await request(app)
        .post('/api/auth/login')
        .send(testUser)

    // save the cookie
    authCookie = res.headers['set-cookie']
})

// Step 3 — after ALL tests, close DB connection
afterAll(async () => {
    await pool.end()
})

/* ================= JOBS ================= */
describe('GET /api/jobs', () => {

    // Test 1 — with valid cookie should get jobs
    it('should return jobs for authenticated user', async () => {
        const res = await request(app)
            .get('/api/jobs')
            .set('Cookie', authCookie) // sending cookie

        // 200 = jobs found, 404 = no jobs for this role (both are valid)
        expect([200, 404]).toContain(res.statusCode)
    })

    // Test 2 — without cookie should get rejected
    it('should return 401 if no cookie sent', async () => {
        const res = await request(app)
            .get('/api/jobs')
            // no cookie sent

        expect(res.statusCode).toBe(401)
        expect(res.body.message).toBe('Unothorised : token missing')
    })

})