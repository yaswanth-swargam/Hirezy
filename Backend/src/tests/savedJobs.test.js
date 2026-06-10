import request from 'supertest'
import app from '../app.js'

const testUser={
    email: 'testuser123@gmail.com',
    password: 'test1234'
}


let authCookie=''
let jobId=''


beforeAll(async ()=>{
    const loginRes=await request(app)
    .post('/api/auth/login')
    .send(testUser)


    authCookie=loginRes.headers['set-cookie']

    const jobsRes=await request(app)
    .get('/api/jobs')
    .set('Cookie',authCookie)

    if(jobsRes.statusCode ===200 && jobsRes.body.jobs.length > 0){
        jobId=jobsRes.body.jobs[0].id;
    }
})



describe('POST /api/saved-jobs/:jobId',()=>{
    
    it('should save a job successfully',async ()=>{
        const res=await request(app)
        .post(`/api/saved-jobs/${jobId}`)
        .set('Cookie',authCookie)

        expect([201,409]).toContain(res.statusCode)
    })


    it('should return 409 if job already saved',async ()=>{

        const res=await request(app)
        .post(`/api/saved-jobs/${jobId}`)
        .set('Cookie',authCookie)

        expect(res.statusCode).toBe(409)
        expect(res.body.message).toBe('Job already saved')

    })

    it('should return 401 if no cookie sent',async ()=>{
        const res=await request(app)
        .post(`/api/saved-jobs/${jobId}`)

        expect(res.statusCode).toBe(401)
    })



})




describe('GET /api/saved-jobs',()=>{

    it('should return saved jobs for authenticated user',async ()=>{
        const res=await request(app)
        .get('/api/saved-jobs')
        .set('Cookie',authCookie)

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('savedJobs')
        expect(Array.isArray(res.body.savedJobs)).toBe(true)
    })


    it('should return 401 if no cookie sent',async ()=>{
        const res= await request(app)
        .get('/api/saved-jobs')

        expect(res.statusCode).toBe(401)
    })
})





describe('DELETE /api/saved-jobs/:jobId',()=>{
    
    it('should remove a job to authorised user',async ()=>{
        const res=await request(app)
        .delete(`/api/saved-jobs/${jobId}`)
        .set('Cookie',authCookie)

        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe('Saved job removed successfully')
    })

    it('should return 404 if job not in saved list',async ()=>{
        const res=await request(app)
        .delete(`/api/saved-jobs/${jobId}`)
        .set('Cookie',authCookie)

        expect(res.statusCode).toBe(404)
        expect(res.body.message).toBe('Saved job not found')
    })



    it('should return 401 if no cookie sent', async () => {
        const res = await request(app)
            .delete(`/api/saved-jobs/${jobId}`)

        expect(res.statusCode).toBe(401)
    })

})