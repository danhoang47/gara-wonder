
export type Province = {
  name: string,
  code: number,
  matches: {
    [key: string]: [number, number]
  }
}

const provinces: Province[] = [
  {
    "name": "Tỉnh Quảng Bình",
    "code": 44,
    "matches": {
      "tỉnh": [
        0,
        4
      ],
      "quảng": [
        5,
        10
      ],
      "bình": [
        11,
        15
      ]
    }
  },
  {
    "name": "Tỉnh Quảng Ninh",
    "code": 22,
    "matches": {
      "tỉnh": [
        0,
        4
      ],
      "quảng": [
        5,
        10
      ]
    }
  },
  {
    "name": "Tỉnh Quảng Trị",
    "code": 45,
    "matches": {
      "tỉnh": [
        0,
        4
      ],
      "quảng": [
        5,
        10
      ]
    }
  },
  {
    "name": "Tỉnh Quảng Nam",
    "code": 49,
    "matches": {
      "tỉnh": [
        0,
        4
      ],
      "quảng": [
        5,
        10
      ]
    }
  },
  {
    "name": "Tỉnh Quảng Ngãi",
    "code": 51,
    "matches": {
      "tỉnh": [
        0,
        4
      ],
      "quảng": [
        5,
        10
      ]
    }
  },
  {
    "name": "Tỉnh Hoà Bình",
    "code": 17,
    "matches": {
      "tỉnh": [
        0,
        4
      ],
      "bình": [
        9,
        13
      ]
    }
  },
  {
    "name": "Tỉnh Thái Bình",
    "code": 34,
    "matches": {
      "tỉnh": [
        0,
        4
      ],
      "bình": [
        10,
        14
      ]
    }
  },
  {
    "name": "Tỉnh Ninh Bình",
    "code": 37,
    "matches": {
      "tỉnh": [
        0,
        4
      ],
      "bình": [
        10,
        14
      ]
    }
  },
  {
    "name": "Tỉnh Bình Định",
    "code": 52,
    "matches": {
      "tỉnh": [
        0,
        4
      ],
      "bình": [
        5,
        9
      ]
    }
  },
  {
    "name": "Tỉnh Bình Thuận",
    "code": 60,
    "matches": {
      "tỉnh": [
        0,
        4
      ],
      "bình": [
        5,
        9
      ]
    }
  },
  {
    "name": "Tỉnh Bình Phước",
    "code": 70,
    "matches": {
      "tỉnh": [
        0,
        4
      ],
      "bình": [
        5,
        9
      ]
    }
  },
  {
    "name": "Tỉnh Bình Dương",
    "code": 74,
    "matches": {
      "tỉnh": [
        0,
        4
      ],
      "bình": [
        5,
        9
      ]
    }
  },
  {
    "name": "Tỉnh Nghệ An",
    "code": 40,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Long An",
    "code": 80,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh An Giang",
    "code": 89,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Hà Giang",
    "code": 2,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Cao Bằng",
    "code": 4,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Bắc Kạn",
    "code": 6,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Tuyên Quang",
    "code": 8,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Lào Cai",
    "code": 10,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Điện Biên",
    "code": 11,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Lai Châu",
    "code": 12,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Sơn La",
    "code": 14,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Yên Bái",
    "code": 15,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Thái Nguyên",
    "code": 19,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Lạng Sơn",
    "code": 20,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Bắc Giang",
    "code": 24,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Phú Thọ",
    "code": 25,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Vĩnh Phúc",
    "code": 26,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Bắc Ninh",
    "code": 27,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Hải Dương",
    "code": 30,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Hưng Yên",
    "code": 33,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Hà Nam",
    "code": 35,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Nam Định",
    "code": 36,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Thanh Hóa",
    "code": 38,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Hà Tĩnh",
    "code": 42,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Phú Yên",
    "code": 54,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Khánh Hòa",
    "code": 56,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Ninh Thuận",
    "code": 58,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Kon Tum",
    "code": 62,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Gia Lai",
    "code": 64,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Đắk Lắk",
    "code": 66,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Đắk Nông",
    "code": 67,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Lâm Đồng",
    "code": 68,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Tây Ninh",
    "code": 72,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Đồng Nai",
    "code": 75,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Tiền Giang",
    "code": 82,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Bến Tre",
    "code": 83,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Trà Vinh",
    "code": 84,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Vĩnh Long",
    "code": 86,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Đồng Tháp",
    "code": 87,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Kiên Giang",
    "code": 91,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Hậu Giang",
    "code": 93,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Sóc Trăng",
    "code": 94,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Bạc Liêu",
    "code": 95,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Cà Mau",
    "code": 96,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Thừa Thiên Huế",
    "code": 46,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  },
  {
    "name": "Tỉnh Bà Rịa - Vũng Tàu",
    "code": 77,
    "matches": {
      "tỉnh": [
        0,
        4
      ]
    }
  }
]

export default provinces