import React from 'react'

const Contact = () => {
  return (
    <>
      <div className="contactContainer">
        <div className="contactContent">
          <div className="contactDetails">
            <h1>Contact Us</h1>
            <form>
              <div>
                <input type="text" placeholder='Name'/>
              </div>
              <div>
                <input type="text" placeholder='Email'/>
              </div>
              <div>
                <input type="text" placeholder='Phone'/>
              </div>
              <div>
                <textarea name="" id="" cols="30" rows="10" placeholder='Message'></textarea>
              </div>
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact;