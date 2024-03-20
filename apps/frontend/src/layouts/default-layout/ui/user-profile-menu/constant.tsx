import { SignInTrigger, SignOutTrigger } from '@/features/user'
import { Link } from '@nextui-org/react';

export const guestProfileMenuSections = [
    {
        options: [
            {
                key: "k1",
                component: <SignInTrigger />,
                title: 'Sign in'
            },
            {
                key: "k2",
                component: <p>Register</p>,
                title: "Register",
            },
        ],
    },
    {
        options: [
            {
                key: "k3",
                component: <p>Become Garage Owner</p>,
                title: "Become Garage Owner",
            },
            {
                key: "k4",
                component: <p>Help Center</p>,
                title: "Help Center",
            },
        ],
    },
];

export const userProfileMenuSections = [
    {
        options: [
            {
                key: "k1",
                component: <SignOutTrigger />,
                title: 'Sign in'
            },
            {
                key: "k2",
                component: <Link href="/garage-management/65db44c8cb29a95ec677b0a2">Your garage</Link>,
                title: "Your garage"
            }
        ],
    }
]
