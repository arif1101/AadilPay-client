import { useEffect, useState, type ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Joyride from "react-joyride"

interface IProps{
    children: ReactNode
}

export default function CommonLayout({children}:IProps) {

  const [runTour, setRunTour] = useState(false)

  const steps = [
    {
      target: "#nav-menu",
      content: "This is the navigation menu. Use it to switch between sections.",
    },
    {
      target: "#dashboard-cards",
      content: "Quick stats about transactions are shown here.",
    },
    {
      target: "#pricing",
      content: "Here is all transaction overview",
    },
    {
      target: "#faq-link",
      content: "This is your all transactions history",
    },
    {
      target: "#contact-link",
      content: "This is your all transactions history",
    },
    {
      target: "#dashboard-link",
      content: "Here you can visualize your all transacitons.",
    }
  ]

useEffect(() => {
  const seenTour = localStorage.getItem("seenTour");
  if (seenTour === "false") {
    setRunTour(true);
    localStorage.setItem("seenTour", "true");
  }
  if (seenTour === "restart") {
    setRunTour(true);
    localStorage.setItem("seenTour", "true");
  }
}, []);
    
  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar/>

      {/* Joyride here */}
<Joyride
  steps={steps}
  run={runTour}
  continuous
  showSkipButton
  disableScrolling={true}
  styles={{
    options: {
      primaryColor: "#f97316",
      zIndex: 10000,
      textColor: "#333",
      backgroundColor: "#fff8f1",
    },
    tooltip: {
      fontSize: "1rem",
      padding: "1.5rem",
    },
    buttonClose: {
      color: "#f97316",
    },
    buttonNext: {
      backgroundColor: "#f97316",
      color: "#fff",
    },
    buttonBack: {
      color: "#f97316",
    },
  }}
/>

        
        <div className='grow'>
            {children}
        </div>
        <Footer/>
    </div>
  )
}
