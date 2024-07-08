import React, { useState} from "react"
import tick from '../img/Tick.svg'

export default function Form(){
            
//This state contains all data that needs to be confirmed as true before data can be submitted
const [formData, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    validEmail: false,
    query: "",
    message: "",
    consent: false
})

const [dataValidated, setDataValidated] = React.useState(null)

//We only want to display errors to the user if they have already submitted the data - this variable allows us to track that and conditionally render based on its value
const firstRender = React.useRef(true)

//As we want to display our own errors we use this function to ensure the email address provided is a valid one. 
function isValidEmail(email) {

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = pattern.test(email)
    return result
}
    
//This function allows us to scroll the user back to the top of the form to confirm successfully entered values or highlight errors
function scrollUp() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}


//This function runs every time an input value changes and then sets the values of those inputs based on the state ensuring there's only one single source of truth.
function updateFormData(e) {

    const {
        type,
        value,
        name,
        checked
    } = e.target
    
    //This variable ensures each time the state changes we are validating the email address syntax is correct.
    let result = isValidEmail(formData.email)
    
    //This state setting function ensures the formData object is updated every time the user makes a change to the data via the inputs.
    setFormdata(prev => {
        return {
            ...prev,
            validEmail:result,
            [name]: type === "checkbox" ? checked : value
        }
    })
    
}

//This function is called when we submit the data. The formData should ready to go
function validateAndSubmitData(e) {
    e.preventDefault()

    //To help manage errors we track when we're on the second render so we can be sure to give the user a chance to succesfully submit their data before highlighting errors in their data
    if (firstRender.current) {
        firstRender.current = false
    }
    //This variable converts the formData object into an array and then checks all values are true
    let validFormData = Object.values(formData).every(item => item)
    //We then setDataValidated based on the truthy/falsy value of the formData
        setDataValidated(validFormData)
    //This will then conditionally render the success message or error messages and then scrollUp function takes them back to top to see the message or review/correct their error messages
    scrollUp()
}

    return (
        <>
        {dataValidated && 
            <div className="modal">
                <div className="modal-flex-container">
                    <img src={tick} className="modal-img"/>
                    <h2 className="modal-title">Message Sent!</h2>
                </div>
                <p className="modal-message">Thanks for completing the form. We’ll be in touch soon!</p>
            </div>}
            <div className="card">
                <h1 className="title">Contact Us</h1>
            <form className={` ${dataValidated? 'disabled': ''} contact-form`}>
                    <div className="flex-container">
                        <div className="flex-container-child">
                            <label htmlFor="firstName" className="label first-name">First Name <span className="star-span">*</span></label>
                            <input
                                className={`input ${
                                firstRender.current ? '' :
                                !firstRender.current && formData.firstName? '' :
                                 'error'}`}
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={formData.firstName}
                                onChange={updateFormData}
                                maxLength="25"
                            />
                            <p className="error-message">This field is required</p> 
                        </div>
                        <div className="flex-container-child">
                            <label htmlFor="lastName"className="label last-name">Last Name <span className="star-span">*</span></label>
                            <input  
                                className={`input ${
                                firstRender.current ? '' :
                                !firstRender.current && formData.lastName? '' :
                                'error'}`}
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={updateFormData}
                                maxLength="25"
                            />
                            <p className="error-message">This field is required</p> 
                        </div>
                    </div>
                        <label htmlFor="email"className="label">Email Address <span className="star-span">*</span></label>
                        <input
                            className={`input ${
                            firstRender.current ? '' :
                            !firstRender.current && formData.validEmail ? '' :
                            'error'}`}
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={updateFormData}
                            autoComplete="off"
                         />
                        <p className="error-message">Please enter a valid email address</p> 
                        <label className="label query" >Query Type <span className="star-span">*</span></label>
                    <div className="flex-container">
                        <div className="radio-input-container">
                            <input
                                type="radio"
                                name="query"
                                id="generalEnquiry"
                                value="generalEnquiry"
                                checked={formData.query === "generalEnquiry"}
                                onChange={updateFormData}
                            />
                            <label className="radio-label" htmlFor="generalEnquiry">General Enquiry</label>
                        </div>
                        <div className="radio-input-container">
                            <input
                                type="radio"
                                name="query"
                                id="supportRequest"
                                value="supportRequest"
                                checked={formData.query === "supportRequest"}
                                onChange={updateFormData}
                            />
                            <label className="radio-label" htmlFor="supportRequest">Support Request </label>
                        </div>
                    </div>
                        <p className={`${!formData.query && !firstRender.current ? 'visible' : ""} error-message`}>Please select a query type</p> 
                        <label htmlFor="message" className="label">Message <span className="star-span">*</span></label>
                        <textarea
                            className={`message-area ${
                            firstRender.current ? '' :
                            !firstRender.current && formData.message? '' :
                            'error'}`}
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={updateFormData}
                        />
                        <p className="error-message">This field is required</p> 
                    <div className="checked-input-container">
                        <input
                        className="checkbox"
                        type="checkbox"
                        id="consent"
                        name="consent"
                        value={formData.consent}
                        onChange={updateFormData}
                        />
                        <label htmlFor="consent" className="checkbox-label">I consent to being contacted by the team <span className="star-span">*</span></label>
                    </div>
                <p className={`${!formData.consent && !firstRender.current ? 'visible' : ""} error-message`}>To submit this form, please consent to being contacted</p> 
                <button className="submit-button" onClick={validateAndSubmitData}>Submit</button>
            </form>
            </div>
        </>
    )
}
/// doubkle check error margins
/// refactor