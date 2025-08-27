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
    content: "Use the navigation menu to quickly switch between different sections of your dashboard.",
  },
  {
    target: "#theme-change",
    content: "Here you can toggle between light and dark themes for a better viewing experience.",
  },
  {
    target: "#pricing",
    content: "This section gives you a complete overview of your transactions and balances.",
  },
  {
    target: "#faq-link",
    content: "Check your detailed transaction history including cash-in and cash-out records.",
  },
  {
    target: "#contact-link",
    content: "Need help? Use this section to contact support or reach out for assistance.",
  },
  {
    target: "#dashboard-link",
    content: "Visualize your transactions through charts and summaries on the main dashboard.",
  },
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
