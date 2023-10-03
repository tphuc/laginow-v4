import slugify from 'slugify'
import prisma from '../lib/prisma'

async function seedSubCategories() {

  let data = [
    {
      "name": "Nhà Hàng & Dịch Vụ Ăn Uống",
      "subcategories": [
        "Nhà Hàng",
        "Café & Quán Cà Phê",
        "Quán Chay",
        "Xe Đẩy & Đồ Ăn Đường Phố",
        "Cửa Hàng Đồ Ngọt",
        "Tiệm bánh"
      ]
    },
    {
      "name": "Chỗ ở & Nơi Lưu Trú",
      "subcategories": [
        "Khách Sạn & Khu Nghỉ Dưỡng",
        "Cho Thuê Nhà Nghỉ",
        "Nhà Trọ",
        "Khu Cắm Trại & Khu Nghỉ Mát"
      ]
    },
    {
      "name": "Cửa Hàng & Tiệm",
      "subcategories": [
        "Thời Trang & Hàng Tiêu Dùng",
        "Giày Dép & Phụ Kiện",
        "Thiết Bị Điện Tử & Tiện Ích",
        "Nội Thất Nhà Cửa & Trang Trí",
        "Cửa Hàng Tạp Hóa & Tiện Lợi",
        "Cửa Hàng Sách, Văn Phòng Phẩm & Quà Tặng",
        "Sản Phẩm Sức Khỏe & Sắc Đẹp",
        "Thể Thao & Thiết Bị Ngoài Trời",
        "Cửa Hàng Nghệ Thuật & Thủ Công"
      ]
    },
    {
      "name": "Sức Khỏe & Làm Đẹp",
      "subcategories": [
        "Phòng Khám Y Khoa & Bệnh Viện",
        "Phòng Khám Răng Hàm Mặt",
        "Nhà Thuốc & Hiệu Thuốc",
        "Phòng Tập Thể Dục & Phòng Gym",
        "Trung Tâm Yoga & Pilates",
        "Dịch Vụ Spa & Massage",
        "Chuyên Gia Dinh Dưỡng & Thực Phẩm",
        "Dịch Vụ Y Học Thay Thế (Châm Cứu ..)"
      ]
    },
    {
      "name": "Giải Trí & Thư Giãn",
      "subcategories": [
        "Rạp Chiếu Phim",
        "Địa Điểm Âm Nhạc",
        "Quán Bar & Quán Rượu",
        "Khu Vui Chơi Bowling & Trò Chơi Máy",
        "Công Viên Giải Trí & Công Viên Nước",
        "Trung Tâm Nghệ Thuật & Rạp Biểu Diễn",
        "Sân Vận Động & Thể thao"
      ]
    },
    {
      "name": "Dịch Vụ Chuyên Nghiệp",
      "subcategories": [
        "Dịch Vụ Luật & Công Ty Luật",
        "Công Ty Bất Động Sản",
        "Công Ty Bảo Hiểm",
        "Dịch Vụ Kế Toán & Thuế",
        "Công Ty Tiếp Thị & Quảng Cáo",
        "Dịch Vụ Thiết Kế & Phát Triển Web",
        "Dịch Vụ Thiết Kế Đồ Họa & In Ấn",
        "Studio Chụp Ảnh & Quay Phim"
      ]
    },
    {
      "name": "Dịch Vụ Sửa Chửa",
      "subcategories": [
        "Sửa Chữa & Bảo Dưỡng",
        "Cửa Hàng ",
        "Cửa Hàng Phụ Kiện",
        "Dịch Vụ Rửa Xe & Vệ Sinh Ô Tô",
        "Trạm Xăng"
      ]
    },
    {
      "name": "Giáo Dục & Học Hỏi",
      "subcategories": [
        "Trường Học & Các Cơ Sở Giáo Dục",
        "Dịch Vụ Gia Sư & Chuẩn Bị Thi",
        "Trường Học & Khóa Học Ngôn Ngữ",
        "Trường Học & Khóa Học Âm Nhạc & Nhảy",
        "Trường Học & Khóa Học Mỹ Thuật",
        "Trung Tâm Đào Tạo"
      ]
    },
    {
      "name": "Dịch Vụ Nhà Cửa",
      "subcategories": [
        "Dịch Vụ Sửa Chữa Ống Nước",
        "Nhà Thầu Điện",
        "Dịch Vụ Vệ Sinh Nhà & Hầu Gia Đình",
        "Dịch Vụ Cảnh Quan & Khu Vườn",
        "Dịch Vụ Kiểm Soát Côn Trùng",
        "Dịch Vụ Sửa Chữa & Nâng Cấp Nhà"
      ]
    },
    {
      "name": "Du Lịch & Du Học",
      "subcategories": [
        "Công Ty Du Lịch & Nhà Tổ Chức Tour",
        "Công Ty Du Lịch",
        "Chuyến Tham Quan & Hướng Dẫn Viên",
        "Hoạt Động Phiêu Lưu & Ngoài Trời",
        "Dịch Vụ Vận Chuyển (Ví Dụ: Taxi, Cho Thuê Xe)"
      ]
    },
    {
      "name": "Dịch Vụ Cộng Đồng",
      "subcategories": [
        "Trung Tâm Cộng Đồng",
        "Thư Viện",
        "Tổ Chức Phi Lợi Nhuận & Từ Thiện",
        "Trung Tâm Thanh Thiếu Niên & Nhà Dưỡng Lão"
      ]
    }
  ]

  await Promise.all(data?.map(async (item) => {
    let masterTag = await prisma.masterTag.create({
      data: {
        name: item.name,
        slug: slugify(item.name, { lower: true })
      },
    })

    if (masterTag?.id) {
      await Promise.all(item.subcategories?.map(async (item) => {
        await prisma.tag.create({
          data: {
            masterTagId: masterTag.id,
            name: item,
            slug: slugify(item, { lower: true })
          }
        })
      }))
    }
  }))

}






async function main() {
  // await seedSubCategories()

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
