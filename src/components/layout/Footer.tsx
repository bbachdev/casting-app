export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={`mt-auto p-6 bg-teal-900 text-white flex flex-row`}>
      <div className={`mx-auto w-full max-w-[1440px] flex flex-row items-center`}>
        <p className={`mx-auto text-center`}>&copy; {year} Casting App</p>
      </div>
    </footer>
  )
}