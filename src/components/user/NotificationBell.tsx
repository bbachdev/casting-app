'use client'
import { Notification } from '@/types/Notifications';
import { useState } from 'react';
import { FaBell, FaRegBell } from 'react-icons/fa';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Link from 'next/link';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
        {notifications.length > 0 ? (
          <FaBell className={`text-xl`} />
        ) : (
          <FaRegBell className={`text-xl`} />
        )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className={`min-w-80 flex flex-col`}>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => {
              return (
                <DropdownMenuItem key={index}>
                  {notification.message}
                </DropdownMenuItem>
              )
            })
          ) : (
            <DropdownMenuLabel className={`mx-auto mt-10 text-lg min-h-20 hover:bg-none font-normal`}>
              <span>
                No new notifications
              </span>
            </DropdownMenuLabel>
          )}
          <DropdownMenuItem className={`bg-slate-100 w-full flex`}>
            <Link href={`/notifications`} className={`mx-auto underline text-center`}>
              See recent notifications
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
