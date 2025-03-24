"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@progress/kendo-react-buttons"
import { Card, CardBody } from "@progress/kendo-react-layout"
import { motion } from "framer-motion"
import Logo from "@/components/logo"

const HomePage = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16 relative"
        >
          {/* Enhanced animated background elements */}
          <motion.div
            className="absolute -z-10 top-0 right-1/4 w-80 h-80 md:w-96 md:h-96 rounded-full bg-blue-500/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 20, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -z-10 bottom-0 left-1/4 w-80 h-80 md:w-96 md:h-96 rounded-full bg-purple-500/20 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -30, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 12,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "easeInOut",
            }}
          />

          {/* Animated logo with more impressive entrance */}
          <motion.div
            className="flex justify-center mb-8 relative"
            initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ 
              duration: 1.2, 
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
          >
            <motion.svg
              width="100%"
              height="100%"
              viewBox="0 0 136 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[200px] md:w-[280px] lg:w-[320px]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.path
                d="M39.4119 9.90909V12.6364H31.5284V9.90909H39.4119ZM33.3182 6.77273H36.9489V18.9773C36.9489 19.3125 37 19.5739 37.1023 19.7614C37.2045 19.9432 37.3466 20.071 37.5284 20.1449C37.7159 20.2187 37.9318 20.2557 38.1761 20.2557C38.3466 20.2557 38.517 20.2415 38.6875 20.2131C38.858 20.179 38.9886 20.1534 39.0795 20.1364L39.6506 22.8381C39.4688 22.8949 39.2131 22.9602 38.8835 23.0341C38.554 23.1136 38.1534 23.1619 37.6818 23.179C36.8068 23.2131 36.0398 23.0966 35.3807 22.8295C34.7273 22.5625 34.2188 22.1477 33.8551 21.5852C33.4915 21.0227 33.3125 20.3125 33.3182 19.4545V6.77273ZM43.7689 15.4318V23H40.1382V5.54545H43.6666V12.2188H43.8201C44.1155 11.446 44.5928 10.8409 45.2519 10.4034C45.911 9.96023 46.7377 9.73864 47.732 9.73864C48.6411 9.73864 49.4337 9.9375 50.1098 10.3352C50.7916 10.7273 51.3201 11.2926 51.6951 12.0312C52.0757 12.7642 52.2632 13.642 52.2576 14.6648V23H48.6269V15.3125C48.6326 14.5057 48.428 13.8778 48.0132 13.429C47.6041 12.9801 47.0303 12.7557 46.2916 12.7557C45.7973 12.7557 45.3598 12.8608 44.9791 13.071C44.6041 13.2812 44.3087 13.5881 44.0928 13.9915C43.8826 14.3892 43.7746 14.8693 43.7689 15.4318ZM59.1607 23.2557C57.8141 23.2557 56.655 22.983 55.6834 22.4375C54.7175 21.8864 53.9732 21.108 53.4505 20.1023C52.9278 19.0909 52.6664 17.8949 52.6664 16.5142C52.6664 15.1676 52.9278 13.9858 53.4505 12.9688C53.9732 11.9517 54.709 11.1591 55.6579 10.5909C56.6124 10.0227 57.7317 9.73864 59.0158 9.73864C59.8795 9.73864 60.6834 9.87784 61.4278 10.1562C62.1778 10.429 62.8312 10.8409 63.388 11.392C63.9505 11.9432 64.388 12.6364 64.7005 13.4716C65.013 14.3011 65.1692 15.2727 65.1692 16.3864V17.3835H54.1153V15.1335H61.7516C61.7516 14.6108 61.638 14.1477 61.4107 13.7443C61.1834 13.3409 60.8681 13.0256 60.4647 12.7983C60.067 12.5653 59.6039 12.4489 59.0755 12.4489C58.5243 12.4489 58.0357 12.5767 57.6096 12.8324C57.1891 13.0824 56.8596 13.4205 56.6209 13.8466C56.3823 14.267 56.2601 14.7358 56.2545 15.2528V17.392C56.2545 18.0398 56.3738 18.5994 56.6124 19.071C56.8567 19.5426 57.2005 19.9062 57.6437 20.1619C58.0868 20.4176 58.6124 20.5455 59.2204 20.5455C59.6238 20.5455 59.9931 20.4886 60.3283 20.375C60.6636 20.2614 60.9505 20.0909 61.1891 19.8636C61.4278 19.6364 61.6096 19.358 61.7346 19.0284L65.0925 19.25C64.9221 20.0568 64.5726 20.7614 64.0442 21.3636C63.5215 21.9602 62.8454 22.4261 62.0158 22.7614C61.192 23.0909 60.2403 23.2557 59.1607 23.2557ZM69.2492 15.4318V23H65.6186V9.90909H69.0788V12.2188H69.2322C69.522 11.4574 70.0078 10.8551 70.6896 10.4119C71.3714 9.96307 72.1981 9.73864 73.1697 9.73864C74.0788 9.73864 74.8714 9.9375 75.5475 10.3352C76.2237 10.733 76.7492 11.3011 77.1242 12.0398C77.4992 12.7727 77.6867 13.6477 77.6867 14.6648V23H74.0561V15.3125C74.0617 14.5114 73.8572 13.8864 73.4424 13.4375C73.0276 12.983 72.4566 12.7557 71.7293 12.7557C71.2407 12.7557 70.8089 12.8608 70.4339 13.071C70.0646 13.2812 69.7748 13.5881 69.5646 13.9915C69.36 14.3892 69.2549 14.8693 69.2492 15.4318ZM82.3612 23.2472C81.526 23.2472 80.7816 23.1023 80.1282 22.8125C79.4748 22.517 78.9578 22.0824 78.5771 21.5085C78.2021 20.929 78.0146 20.2074 78.0146 19.3438C78.0146 18.6165 78.1481 18.0057 78.4152 17.5114C78.6822 17.017 79.0459 16.6193 79.5061 16.3182C79.9663 16.017 80.489 15.7898 81.0743 15.6364C81.6652 15.483 82.2845 15.375 82.9322 15.3125C83.6936 15.233 84.3072 15.1591 84.7731 15.0909C85.239 15.017 85.5771 14.9091 85.7873 14.767C85.9976 14.625 86.1027 14.4148 86.1027 14.1364V14.0852C86.1027 13.5455 85.9322 13.1278 85.5913 12.8324C85.2561 12.5369 84.7788 12.3892 84.1595 12.3892C83.5061 12.3892 82.9862 12.5341 82.5998 12.8239C82.2135 13.108 81.9578 13.4659 81.8328 13.8977L78.4748 13.625C78.6453 12.8295 78.9805 12.142 79.4805 11.5625C79.9805 10.9773 80.6254 10.5284 81.4152 10.2159C82.2106 9.89773 83.1311 9.73864 84.1765 9.73864C84.9038 9.73864 85.5998 9.82386 86.2646 9.99432C86.9351 10.1648 87.5288 10.429 88.0459 10.7869C88.5686 11.1449 88.9805 11.6051 89.2816 12.1676C89.5828 12.7244 89.7334 13.392 89.7334 14.1705V23H86.2902V21.1847H86.1879C85.9777 21.5938 85.6964 21.9545 85.3441 22.267C84.9919 22.5739 84.5686 22.8153 84.0743 22.9915C83.5799 23.1619 83.0089 23.2472 82.3612 23.2472ZM83.401 20.7415C83.9351 20.7415 84.4066 20.6364 84.8157 20.4261C85.2248 20.2102 85.5459 19.9205 85.7788 19.5568C86.0118 19.1932 86.1282 18.7812 86.1282 18.321V16.9318C86.0146 17.0057 85.8584 17.0739 85.6595 17.1364C85.4663 17.1932 85.2476 17.2472 85.0032 17.2983C84.7589 17.3437 84.5146 17.3864 84.2703 17.4261C84.026 17.4602 83.8044 17.4915 83.6055 17.5199C83.1794 17.5824 82.8072 17.6818 82.489 17.8182C82.1709 17.9545 81.9237 18.1392 81.7476 18.3722C81.5714 18.5994 81.4834 18.8835 81.4834 19.2244C81.4834 19.7188 81.6623 20.0966 82.0203 20.358C82.3839 20.6136 82.8441 20.7415 83.401 20.7415ZM90.6301 23V9.90909H94.0903V12.2188H94.2438C94.5165 11.4517 94.971 10.8466 95.6074 10.4034C96.2438 9.96023 97.0051 9.73864 97.8915 9.73864C98.7892 9.73864 99.5534 9.96307 100.184 10.4119C100.815 10.8551 101.235 11.4574 101.445 12.2188H101.582C101.849 11.4688 102.332 10.8693 103.031 10.4205C103.735 9.96591 104.568 9.73864 105.528 9.73864C106.749 9.73864 107.741 10.1278 108.502 10.9062C109.269 11.679 109.653 12.7756 109.653 14.196V23H106.031V14.9119C106.031 14.1847 105.838 13.6392 105.451 13.2756C105.065 12.9119 104.582 12.7301 104.002 12.7301C103.343 12.7301 102.829 12.9403 102.46 13.3608C102.09 13.7756 101.906 14.3239 101.906 15.0057V23H98.3858V14.8352C98.3858 14.1932 98.2011 13.6818 97.8318 13.3011C97.4682 12.9205 96.9881 12.7301 96.3915 12.7301C95.9881 12.7301 95.6244 12.8324 95.3006 13.0369C94.9824 13.2358 94.7295 13.517 94.542 13.8807C94.3545 14.2386 94.2608 14.6591 94.2608 15.142V23H90.6301ZM116.567 23.2557C115.22 23.2557 114.061 22.983 113.089 22.4375C112.123 21.8864 111.379 21.108 110.856 20.1023C110.334 19.0909 110.072 17.8949 110.072 16.5142C110.072 15.1676 110.334 13.9858 110.856 12.9688C111.379 11.9517 112.115 11.1591 113.064 10.5909C114.018 10.0227 115.138 9.73864 116.422 9.73864C117.285 9.73864 118.089 9.87784 118.834 10.1562C119.584 10.429 120.237 10.8409 120.794 11.392C121.356 11.9432 121.794 12.6364 122.106 13.4716C122.419 14.3011 122.575 15.2727 122.575 16.3864V17.3835H111.521V15.1335H119.158C119.158 14.6108 119.044 14.1477 118.817 13.7443C118.589 13.3409 118.274 13.0256 117.871 12.7983C117.473 12.5653 117.01 12.4489 116.481 12.4489C115.93 12.4489 115.442 12.5767 115.016 12.8324C114.595 13.0824 114.266 13.4205 114.027 13.8466C113.788 14.267 113.666 14.7358 113.66 15.2528V17.392C113.66 18.0398 113.78 18.5994 114.018 19.071C114.263 19.5426 114.606 19.9062 115.05 20.1619C115.493 20.4176 116.018 20.5455 116.626 20.5455C117.03 20.5455 117.399 20.4886 117.734 20.375C118.069 20.2614 118.356 20.0909 118.595 19.8636C118.834 19.6364 119.016 19.358 119.141 19.0284L122.498 19.25C122.328 20.0568 121.979 20.7614 121.45 21.3636C120.927 21.9602 120.251 22.4261 119.422 22.7614C118.598 23.0909 117.646 23.2557 116.567 23.2557ZM133.917 13.642L130.593 13.8466C130.536 13.5625 130.414 13.3068 130.226 13.0795C130.039 12.8466 129.792 12.6619 129.485 12.5256C129.184 12.3835 128.823 12.3125 128.402 12.3125C127.84 12.3125 127.365 12.4318 126.979 12.6705C126.593 12.9034 126.399 13.2159 126.399 13.608C126.399 13.9205 126.524 14.1847 126.774 14.4006C127.024 14.6165 127.453 14.7898 128.061 14.9205L130.431 15.3977C131.703 15.6591 132.652 16.0795 133.277 16.6591C133.902 17.2386 134.215 18 134.215 18.9432C134.215 19.8011 133.962 20.554 133.456 21.2017C132.956 21.8494 132.269 22.3551 131.394 22.7188C130.524 23.0767 129.522 23.2557 128.385 23.2557C126.652 23.2557 125.272 22.8949 124.243 22.1733C123.221 21.446 122.621 20.4574 122.445 19.2074L126.016 19.0199C126.124 19.5483 126.385 19.9517 126.8 20.2301C127.215 20.5028 127.746 20.6392 128.394 20.6392C129.03 20.6392 129.542 20.517 129.928 20.2727C130.32 20.0227 130.519 19.7017 130.524 19.3097C130.519 18.9801 130.38 18.7102 130.107 18.5C129.834 18.2841 129.414 18.1193 128.846 18.0057L126.578 17.554C125.3 17.2983 124.348 16.8551 123.723 16.2244C123.104 15.5937 122.794 14.7898 122.794 13.8125C122.794 12.9716 123.022 12.2472 123.476 11.6392C123.936 11.0312 124.581 10.5625 125.411 10.233C126.246 9.90341 127.223 9.73864 128.343 9.73864C129.996 9.73864 131.297 10.0881 132.246 10.7869C133.201 11.4858 133.757 12.4375 133.917 13.642Z"
                fill="#ffffff"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <motion.path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.3684 3.05371L22.6727 5.15328C22.2029 5.51919 21.5255 5.43498 21.1596 4.96519L20.782 4.48042C20.6246 4.27836 20.6608 3.98698 20.8629 3.8296C21.2111 3.55837 21.0193 3 20.5779 3H17.6413C16.8281 3 16.1689 3.65924 16.1689 4.47244V6.76288C16.1689 7.74616 15.3717 8.54326 14.3885 8.54326H13.5387C13.0248 8.54326 12.6081 8.1266 12.6081 7.61263V6.74778C12.6081 6.71145 12.5786 6.682 12.5423 6.682C12.5178 6.682 12.4953 6.69572 12.4837 6.71741C12.2684 7.12229 11.9838 7.48041 11.6298 7.79177C11.2655 8.10634 10.8277 8.35393 10.3165 8.53452C9.80532 8.70929 9.2148 8.79667 8.54496 8.79667C7.68121 8.79667 6.91148 8.64812 6.23575 8.35102C5.56003 8.04809 5.02533 7.60244 4.63165 7.01406C4.24385 6.41985 4.04994 5.68001 4.04994 4.79453C4.04994 3.94585 3.41988 3 2.5712 3H0.991723C0.444009 3 0 3.44401 0 3.99172V4.19792C0 4.86146 0.75847 5.33412 1.42201 5.33412C2.20025 5.33412 2.8319 5.58818 3.31695 6.09628C3.80561 6.60068 4.04994 7.31648 4.04994 8.24368V12.8367C4.04994 13.4739 3.53337 13.9905 2.89615 13.9905C2.25893 13.9905 1.74236 13.4739 1.74236 12.8367V8.71099C1.74236 8.23626 1.61929 7.88022 1.37314 7.64286C1.127 7.40549 0.819322 7.28681 0.450107 7.28681C0.178911 7.28681 0 7.53471 0 7.8059V20.0641C0 20.2934 0.263815 20.4223 0.444727 20.2814C0.56475 20.1879 0.73783 20.2094 0.831313 20.3295L1.50343 21.1924C1.7362 21.4913 1.68263 21.9222 1.38377 22.155L0.885197 22.5433C0.861697 22.5616 0.857485 22.5955 0.875788 22.619C0.889544 22.6367 0.912782 22.6439 0.934278 22.6377C1.38476 22.5068 1.83239 22.5181 2.27716 22.6718C2.73632 22.8275 3.1432 23.133 3.4978 23.5882C3.82958 24.0142 4.02567 24.4582 4.08607 24.9202C4.14647 25.3821 4.07204 25.8358 3.8628 26.2811C3.65621 26.7243 3.31464 27.1315 2.83808 27.5027C2.20956 27.9922 2.55573 29 3.3524 29H5.96042C6.19996 29 6.43565 28.9469 6.66079 28.8651C6.8388 28.8005 7.02323 28.7433 7.21409 28.6937C7.82517 28.5364 8.46564 28.4258 9.13548 28.3617C9.92284 28.2801 10.5574 28.2044 11.0393 28.1345C11.5211 28.0588 11.8707 27.9481 12.0881 27.8024C12.3055 27.6568 12.4142 27.4413 12.4142 27.1558V27.1034C12.4142 26.5499 12.2379 26.1218 11.8854 25.8188C11.5387 25.5159 11.0451 25.3645 10.4047 25.3645C9.72894 25.3645 9.1913 25.513 8.79175 25.8101C8.1411 26.2844 7.4228 26.8648 6.62021 26.8001L6.55292 26.7947C5.47959 26.7083 4.70444 25.6522 5.34727 24.7883C5.41641 24.6954 5.48929 24.6049 5.56591 24.5168C6.08299 23.9168 6.74989 23.4566 7.56664 23.1362C8.38925 22.81 9.34114 22.6468 10.4223 22.6468C11.1744 22.6468 11.8942 22.7342 12.5817 22.909C13.275 23.0838 13.889 23.3546 14.4237 23.7217C14.9643 24.0887 15.3903 24.5605 15.7017 25.1373C16.0131 25.7082 16.1689 26.3927 16.1689 27.1908V28.1344C16.1689 28.6124 16.5564 29 17.0345 29C17.5126 29 17.9001 28.6124 17.9001 28.1344V23.8034C17.9001 23.1646 18.4179 22.6468 19.0566 22.6468C19.6954 22.6468 20.2131 23.1646 20.2131 23.8034V27.7761C20.2131 28.0914 20.2729 28.3658 20.3923 28.5995C20.536 28.885 20.8624 29 21.1821 29H22.4541C22.4623 29 22.4702 28.9967 22.4758 28.9908C22.48 28.9865 22.4841 28.9822 22.4881 28.9778C22.7234 28.7293 22.8411 28.3955 22.8411 27.9764V23.7681C22.8411 23.1488 23.3431 22.6468 23.9623 22.6468C24.5815 22.6468 25.0835 23.1488 25.0835 23.7681V27.8651C25.0835 28.3102 25.2011 28.6681 25.4364 28.9388C25.471 28.9792 25.5225 29 25.5757 29H25.6423C25.8399 29 26 28.8399 26 28.6423V14.9434C26 14.6031 25.6579 14.3653 25.4364 14.6236C25.2011 14.8943 25.0835 15.2522 25.0835 15.6973V19.7944C25.0835 20.4136 24.5815 20.9156 23.9623 20.9156C23.3431 20.9156 22.8411 20.4136 22.8411 19.7944V15.586C22.8411 15.1669 22.7234 14.8331 22.4881 14.5846C22.2565 14.3361 21.9506 14.2119 21.5705 14.2119C21.3135 14.2119 21.0819 14.2787 20.8756 14.4122C20.6728 14.542 20.5118 14.7256 20.3923 14.9629C20.2729 15.1966 20.2131 15.471 20.2131 15.7863V19.7591C20.2131 20.3978 19.6954 20.9156 19.0566 20.9156C18.4179 20.9156 17.9001 20.3978 17.9001 19.7591V13.4727C17.9001 12.8639 18.3936 12.3705 19.0023 12.3705H19.3507C19.7671 12.3705 20.1045 12.708 20.1045 13.1243V13.821C20.1045 13.8525 20.1301 13.8781 20.1617 13.8781C20.186 13.8781 20.2076 13.8627 20.2159 13.8398C20.391 13.3572 20.676 12.975 21.071 12.6931C21.4764 12.4039 21.9615 12.2592 22.5262 12.2592C23.0981 12.2592 23.5849 12.4057 23.9867 12.6987C24.3767 12.9795 24.6406 13.3582 24.7782 13.8347C24.7856 13.8602 24.8088 13.8781 24.8354 13.8781C24.8604 13.8781 24.8826 13.8622 24.8912 13.8387C25.064 13.3675 25.367 12.9894 25.8002 12.7043C25.9198 12.6252 26 12.4954 26 12.3521V9.84917C26 9.46867 25.5623 9.25476 25.2621 9.48857C25.0629 9.64368 24.7757 9.60798 24.6206 9.40883L24.2389 8.9188C23.873 8.44902 23.9572 7.77155 24.427 7.40565L25.2044 6.80014C25.7064 6.40914 26 5.80841 26 5.1721V3.42352C26 3.18961 25.8104 3 25.5765 3H25.5318C25.4729 3 25.4152 3.01799 25.3684 3.05371ZM9.12746 3.07249C9.3172 3.01828 9.51486 3 9.71221 3H11.6947C12.1067 3 12.4406 3.33397 12.4406 3.74594C12.4406 4.21781 12.3202 4.64016 12.0793 5.01299C11.8384 5.38583 11.5064 5.68293 11.0833 5.9043C10.6603 6.11984 10.1726 6.22761 9.62024 6.22761C9.0444 6.22761 8.56846 6.09654 8.19241 5.83439C7.82223 5.56642 7.63714 5.17902 7.63714 4.6722C7.63714 4.32267 7.72822 4.03139 7.91037 3.79837C8.09252 3.55952 8.34812 3.37019 8.67716 3.23038C8.81716 3.1709 8.96725 3.11827 9.12746 3.07249ZM1.2095 26.0378C0.717487 26.421 0 26.0704 0 25.4468V23.6958C0 23.5791 0.074543 23.4728 0.189285 23.4511C0.455038 23.4024 0.704562 23.4262 0.937857 23.5225C1.17323 23.6215 1.38008 23.7855 1.55841 24.0144C1.82384 24.3552 1.92574 24.7057 1.86413 25.066C1.80518 25.4241 1.58697 25.7481 1.2095 26.0378ZM8.28784 20.2344C9.09506 20.6885 10.0581 20.9156 11.1768 20.9156C12.0737 20.9156 12.8644 20.7784 13.5489 20.504C14.2381 20.225 14.7999 19.8371 15.2342 19.3404C15.2968 19.2689 15.3563 19.1957 15.4129 19.1208C15.954 18.4035 15.3031 17.5277 14.4065 17.4684L14.1505 17.4515C13.6543 17.4187 13.2218 17.7483 12.8621 18.0916C12.6638 18.2808 12.4254 18.4227 12.1469 18.5173C11.8684 18.6119 11.5616 18.6592 11.2264 18.6592C10.7213 18.6592 10.2846 18.5528 9.91644 18.34C9.54824 18.1271 9.26264 17.8244 9.05966 17.4317C8.86139 17.0391 8.76226 16.5732 8.76226 16.034C8.76226 16.03 8.76544 16.0269 8.76935 16.0269H15.3387C15.7972 16.0269 16.1688 15.6552 16.1688 15.1967C16.1688 14.2696 16.039 13.4607 15.7794 12.7701C15.5198 12.0747 15.1563 11.4976 14.6889 11.0388C14.2263 10.58 13.6835 10.237 13.0603 10.01C12.442 9.77819 11.774 9.6623 11.0565 9.6623C9.98961 9.6623 9.05966 9.89882 8.2666 10.3718C7.47826 10.8449 6.86695 11.5047 6.43265 12.3515C5.99836 13.1982 5.78121 14.1821 5.78121 15.3031C5.78121 16.4526 5.99836 17.4483 6.43265 18.2903C6.86695 19.1275 7.48534 19.7756 8.28784 20.2344ZM9.88863 14.1537C9.27674 14.1537 8.76517 13.6147 9.06674 13.0823C9.265 12.7275 9.53879 12.4461 9.88812 12.2379C10.2422 12.0251 10.6481 11.9186 11.106 11.9186C11.545 11.9186 11.9298 12.0156 12.2602 12.2095C12.5954 12.3988 12.8574 12.6613 13.0462 12.9971C13.3721 13.5768 12.7903 14.1537 12.1253 14.1537H9.88863Z"
                fill="#1274AC"
                initial={{ opacity: 0, pathLength: 0, fill: "transparent" }}
                animate={{ opacity: 1, pathLength: 1, fill: "#1274AC" }}
                transition={{ 
                  pathLength: { duration: 2.5, delay: 0.2 },
                  opacity: { duration: 1, delay: 0.2 },
                  fill: { duration: 1.5, delay: 2.2 }
                }}
              />
            </motion.svg>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-slate-300 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Create stunning portfolio websites in minutes, not hours. No coding
            required.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  themeColor="primary"
                  size="large"
                  className="px-8 py-4 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-purple-500/30"
                >
                  Get Started Free
                </Button>
              </motion.div>
            </Link>
            <Link href="/examples">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  themeColor="info"
                  size="large"
                  className="px-8 py-4 rounded-lg font-medium bg-slate-700/50 hover:bg-slate-700/80 backdrop-blur-sm border border-slate-600 transition-all"
                >
                  View Examples
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced preview image with more animations */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.9,
            type: "spring",
            stiffness: 100,
          }}
          className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl mx-auto max-w-4xl group perspective"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
            whileHover={{ opacity: 0.6 }}
          />
          
          <motion.div 
            className="absolute inset-0 z-0"
            whileHover={{ 
              rotateX: [-1, 1, -1], 
              rotateY: [1, -1, 1] 
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/dashboard-preview.png"
              alt="TheNames dashboard preview"
              fill
              style={{ objectFit: "cover" }}
              priority
              className="rounded-xl"
            />
          </motion.div>
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
          />

          {/* Enhanced floating elements */}
          <motion.div
            className="absolute top-6 right-6 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 z-10"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 2, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
          >
            <div className="w-16 h-2 bg-blue-400/80 rounded-full" />
            <div className="w-10 h-2 bg-purple-400/80 rounded-full mt-2" />
            <div className="w-14 h-2 bg-cyan-400/80 rounded-full mt-2" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-20 left-6 bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 z-10"
            animate={{
              y: [0, 8, 0],
              rotate: [0, -2, 0],
              scale: [1, 1.02, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <div className="w-12 h-2 bg-green-400/80 rounded-full" />
            <div className="w-16 h-2 bg-cyan-400/80 rounded-full mt-2" />
            <div className="w-8 h-2 bg-blue-400/80 rounded-full mt-2" />
          </motion.div>
          
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-5 rounded-lg border border-white/20 z-10"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <div className="w-20 h-2 bg-blue-400/80 rounded-full" />
            <div className="w-16 h-2 bg-purple-400/80 rounded-full mt-2" />
            <div className="w-24 h-2 bg-cyan-400/80 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section with improved animations */}
      <div className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Build your online identity
          </span>{" "}
          in three simple steps
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Choose your template",
              description:
                "Select from our beautiful, professionally designed templates",
              icon: "✨",
              color: "from-blue-500 to-cyan-400",
              iconBg: "bg-blue-900/30"
            },
            {
              title: "Add your content",
              description:
                "Fill in your details or let AI generate content for you",
              icon: "✏️",
              color: "from-purple-500 to-blue-500",
              iconBg: "bg-purple-900/30"
            },
            {
              title: "Publish instantly",
              description: "Share your new site with the world with one click",
              icon: "🚀",
              color: "from-violet-500 to-purple-500",
              iconBg: "bg-violet-900/30"
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ 
                y: -15, 
                transition: { duration: 0.3 } 
              }}
            >
              <Card className="h-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all transform-gpu">
                <CardBody>
                  <motion.div
                    className={`text-5xl mb-6 p-4 rounded-full inline-block ${feature.iconBg} bg-gradient-to-r ${feature.color} shadow-lg w-20 h-20 flex items-center justify-center`}
                    initial={{ rotate: 0, scale: 1 }}
                    whileHover={{ 
                      rotate: [0, -15, 15, -5, 0], 
                      scale: 1.1,
                      transition: { duration: 0.8 } 
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-3xl">{feature.icon}</span>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                  
                  <motion.div 
                    className="mt-6 flex justify-end"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${feature.color} text-xs font-medium opacity-75`}>
                      Learn more →
                    </div>
                  </motion.div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center py-16 px-4 bg-gradient-to-br from-slate-800 to-slate-900 border-t border-slate-700/50 relative overflow-hidden"
      >
        {/* Background animation elements */}
        <motion.div
          className="absolute -z-10 top-0 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -z-10 bottom-0 left-1/3 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            y: [30, -30, 30],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl mx-auto relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Ready to build your portfolio?
          </h2>
          <p className="mb-10 text-slate-300 text-lg">
            Join thousands of creators showcasing their work with TheNames
          </p>
          <Link href="/signup">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                themeColor="primary"
                size="large"
                className="px-10 py-6 rounded-lg font-medium text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-purple-500/30"
              >
                Create Your Site Now
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-slate-400 border-t border-slate-800">
        <p>© 2025 TheNames. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HomePage