import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import TopBar from '../../DashBoard/Components/TopBar';
import styles from './Profile.module.css';

const Profile = () => {
    return (
        <>
        <TopBar/>
            <div>Profile</div>
            <>
            <div class="container mt-3">
    <div class="card p-3 text-center">
        <div class="d-flex flex-row justify-content-center mb-3">
            <div className={styles.image}> <img src="https://i.imgur.com/hczKIze.jpg" class="rounded-circle"/> <span><i class='bx bxs-camera-plus'></i></span> </div>
            <div class="d-flex flex-column ms-3 user-details">
                <h4 class="mb-0">Zenda Grace</h4>
                <div className={styles.ratings}> <span>4.0</span> <i class='bx bx-star ms-1'></i> </div> <span>Pro Member</span>
            </div>
        </div>
        <h4>Edit Profile</h4>
        <div class="row">
            <div class="col-md-6">
                <div className={styles.inputs}> <label>Name</label> <input class="form-control" type="text" placeholder="Name"/> </div>
            </div>
            <div class="col-md-6">
                <div className={styles.inputs}> <label>Email</label> <input class="form-control" type="text" placeholder="Email"/> </div>
            </div>
            <div class="col-md-6">
                <div className={styles.inputs}> <label>City</label> <input class="form-control" type="text" placeholder="City"/> </div>
            </div>
            <div class="col-md-6">
                <div className={styles.inputs}> <label>Country</label> <input class="form-control" type="text" placeholder="Country"/> </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div className={styles.aboutinputs}> <label>About</label> <textarea class="form-control" type="text" placeholder="Tell us about yourself"> </textarea> </div>
            </div>
        </div>
        <div class="mt-3 gap-2 d-flex justify-content-end"> <button class="px-3 btn btn-sm btn-outline-primary">Cancel</button> <button class="px-3 btn btn-sm btn-primary">Save</button> </div>
    </div>
</div>
            </>
        </>
    )
}

export default Profile