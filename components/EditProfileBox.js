import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from '../styles/ProfileBox.module.css';
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";
import Link from "next/link";


export function EditProfileBox(props) {

    const userData = props.userData;

    const handleFirstnameChange = (event) => {
        userData.firstname = event.target.value;
        userData.firstInitial = userData.firstname[0];
    };

    const handleLastnameChange = (event) => {
        userData.lastname = event.target.value;
        userData.lastInitial = userData.lastname[0];
    };

    const handlePhoneChange = (event) => {
        userData.phone = event.target.value;
    };

    const saveNewUserInfo = () => {
        axios.put(`/api/users/${userData.uid}`, userData).then((response) => {
            console.log(response)
        })
    }

    const deleteAccount = () => {
        try {
            axios.delete(`/api/users/${userData.uid}`).then((response) => {
                console.log(response)
                const auth = getAuth();
                const user = auth.currentUser;

                deleteUser(user).then(() => {
                    console.log('user deleted')
                }).catch((error) => {
                    console.log(error)
                });
            })
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <div className={styles.profile}>
            <h2>Edit Profile</h2>
            <div>
                <p>First Name</p>
                <input
                    type="text"
                    name="firstname"
                    placeholder={userData != null ? userData.firstname : "loading"}
                    onChange={handleFirstnameChange}
                />
                <p>Last Name</p>
                <input
                    type="text"
                    name="lastname"
                    placeholder={userData != null ? userData.lastname : "loading"}
                    onChange={handleLastnameChange}
                />
                <p>Email<br></br>{userData != null ? userData.email : ""}</p>
                <p>Phone</p>
                <input
                    type="text"
                    name="phone"
                    placeholder={userData != null ? userData.phone : "loading"}
                    onChange={handlePhoneChange}
                />
            </div>
            <Link href="profile">
                <a className={styles.button}
                    // href='profile' 
                    onClick={saveNewUserInfo}>
                    Save
                </a>
            </Link>
            <Link href='/'>
                <a className={styles.button}
                    // href='/' 
                    onClick={deleteAccount}>
                    Delete Account
                </a>
            </Link>
        </div>
    );
}