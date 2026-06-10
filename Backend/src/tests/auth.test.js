import request from 'supertest'
import app from '../app.js'


const testUser={
    name: "testUser",
    email:"testuser123@gmail.com",
    password: "test1234",
    role: "developer"
}


let authCookie=''


//register

describe('POST /api/auth/register',()=>{
    it('should register a new user succesfully',async ()=>{
        const res=await request(app)
        .post('/api/auth/register')
        .send(testUser)

        expect([201,409]).toContain(res.statusCode)
    })

    

    it('should return 400 if required fields are missing',async ()=>{
        const res=await request(app)
        .post('/api/auth/register')
        .send({email: 'test@gmail.com'})

        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe('Name, email and password are required')
    })


    it('should return 409 if user already exists',async ()=>{
        const res=await request(app)
        .post('/api/auth/register')
        .send(testUser)

        expect(res.statusCode).toBe(409)
        expect(res.body.message).toBe('User already exists with this email')
    })
})



describe('POST /api/auth/login',()=>{
    
    it('should login successfully and set cookie',async()=>{
        const res=await request(app)
        .post('/api/auth/login')
        .send({
            email: testUser.email,
            password: testUser.password
        })

        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe('User Logged in successfully')
        expect(res.body.user).toHaveProperty('email',testUser.email)


        authCookie=res.headers['set-cookie']
    })



    it('should return 401 for wrong password',async ()=>{

        const res=await request(app)
        .post('/api/auth/login')
        .send({
            email: testUser.email,
            password: "wrong password"
        })

        expect(res.statusCode).toBe(401)

        expect(res.body.message).toBe("Invalid email or password")
    })

    it('should return 401 for wrong email',async ()=>{
        const res=await request(app)
        .post('/api/auth/login')
        .send({email: "some@gmail.com",
            password: "dfjdf"
        })

        expect(res.statusCode).toBe(401)
    })



    it('should return 400 if fields are missing', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@gmail.com' }) // missing password

        expect(res.statusCode).toBe(400)
    })
})






describe('GET /api/auth/verify',()=>{

    beforeAll(async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: testUser.password
            })
        authCookie = res.headers['set-cookie']
    })

    it('should return user if valid cookie is sent',async ()=>{
        const res=await request(app)
        .get('/api/auth/verify')
        .set('Cookie',authCookie)

        expect(res.statusCode).toBe(200)
        expect(res.body.user).toHaveProperty('email')

    })



     it('should return 401 if no cookie sent', async () => {
        const res = await request(app)
            .get('/api/auth/verify')

        expect(res.statusCode).toBe(401)
    })
})




describe('POST /api/auth/logout',()=>{
    it('should logout successfully and clear cookie',async ()=>{
        const res=await request(app)
        .post('/api/auth/logout')
        .set('Cookie',authCookie)

        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("logout successfully")
    })
})