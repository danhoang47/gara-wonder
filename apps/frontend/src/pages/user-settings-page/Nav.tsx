/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import "./nav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const items = [
    {
        id: 0,
        label: "Thiết lập tài khoản",
        icon: <FontAwesomeIcon icon={faCircleUser} />,
    },
    {
        id: 1,
        label: "Thiết lập tiền tệ",
        icon: <FontAwesomeIcon icon={faCircleUser} />,
    },
    {
        id: 2,
        label: "Thiết lập đơn hàng",
        icon: <FontAwesomeIcon icon={faCircleUser} />,
    },
    {
        id: 3,
        label: "Thiết lập thông báo",
        icon: <FontAwesomeIcon icon={faCircleUser} />,
    },
];

const Nav = ({ observerRefs }: any) => {
    const [visibleKey, setVisibleKey] = useState(0);
    const observers = useRef<any>([]);

    const onClick = (_: any, key: number) => {
        setVisibleKey(key);
    };

    const observerCallback = async (e: any, key: number) => {
        if (e.length && e[0].isIntersecting) {
            setVisibleKey(key);
        }
    };

    useEffect(() => {
        if (observerRefs.current?.length && observers.current) {
            Array.from(Array(4).keys()).forEach((_, key) => {
                observers.current[key] = new IntersectionObserver((e) =>
                    observerCallback(e, key),
                );
                if (observerRefs.current[key]) {
                    observers.current[key].observe(observerRefs.current[key]);
                }
            });
        }
        return () =>
            observers.current.forEach(
                (observer: any) => observer?.current?.disconnect(),
            );
    }, [observerRefs, observers]);

    return (
        <div className="navigation sticky top-24">
            <ul>
                {items.map((item, key) => {
                    return (
                        <li
                            key={`item-${key}`}
                            className={`${key === visibleKey ? " active" : ""}`}
                            onClick={() => onClick(item, key)}
                        >
                            <a href={`#${item.id}`}>
                                {item.icon}
                                <span className="text text-neutral-500 ml-1">
                                    {item.label}
                                </span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Nav;
