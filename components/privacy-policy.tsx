'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const PrivacyPolicy = () => {

    const searchParams = useSearchParams();

    const lg = searchParams?.get('lang');

    let [lang, setLang] = useState(lg ?? 'en');



    return (
        <div className='container mx-auto '>
            <Select defaultValue={lang} onValueChange={setLang}>
                <SelectTrigger className="w-[320px] h-8">
                    <SelectValue placeholder="VN" />
                </SelectTrigger>
                <SelectContent>

                    <SelectItem value="vn"> Tiếng Việt</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                </SelectContent>
            </Select>


            {lang === 'en' ? <div className="py-6">
                <h1 className="text-2xl font-heading mb-4">Privacy Policy</h1>
                <p>Lagi Now is committed to respecting and protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform.</p>
                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2">1. Information Collection:</h2>
                    <p>We may collect personal information that you voluntarily provide to us when registering, making purchases, signing up for promotions, responding to surveys, or engaging in other activities on our platform. The information we collect may include your name, email address, phone number, and other identifying information.</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2">2. Information Use:</h2>
                    We use the information we collect to deliver the services you request, to enhance our platform, to provide customized content, and to communicate with you about our services.
                </div>


                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2">3. Cookies and Tracking Technologies:</h2>
                    We may use cookies, web beacons, tracking pixels, and other tracking technologies to collect and store your information, to improve your online experience, and to understand platform activity and trends.
                </div>


                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2">4. Information Sharing:</h2>
                    We may share your information with trusted third-party service providers, as necessary for them to perform services on our behalf. We do not sell or share your information with third parties for their own marketing purposes without your consent.
                </div>


                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2">  5. Data Security:</h2>
                    We implement a variety of security measures to maintain the safety of your personal information, including secured networks and encryption.
                </div>


                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2"> 6. Children Privacy:</h2>
                    Our platform is not intended for use by individuals under 13 years of age. We do not knowingly collect personal information from children under 13.
                </div>



                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2"> 7. Changes to This Policy:</h2>
                    We may update this Privacy Policy from time to time to reflect changes in our practices. Any changes will be posted on this page with an updated revision date.
                </div>




                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2"> 8. Contact Us:</h2>
                    If you have questions or concerns about this Privacy Policy, please contact us at contact@laginow.com.
                </div>




            </div> :
                <div className="py-6">
                    <h1 className="text-2xl font-heading mb-4">Chính sách quyền riêng tư</h1>
                    <p>Lagi Now cam kết tôn trọng và bảo vệ quyền riêng tư của bạn. Chính sách quyền riêng tư này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin của bạn khi bạn truy cập nền tảng của chúng tôi.</p>
                    <div className="mb-4">
                        <h2 className="text-xl font-heading mb-2">1. Thu thập thông tin:</h2>
                        <p>Chúng tôi có thể thu thập thông tin cá nhân mà bạn tự nguyện cung cấp cho chúng tôi khi đăng ký, mua hàng, đăng ký khuyến mãi, trả lời khảo sát hoặc tham gia vào các hoạt động khác trên nền tảng của chúng tôi. Thông tin chúng tôi thu thập có thể bao gồm tên, địa chỉ email, số điện thoại của bạn và thông tin nhận dạng khác.</p>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-heading mb-2">2. Sử dụng thông tin:</h2>
                        Chúng tôi sử dụng thông tin thu thập được để cung cấp các dịch vụ mà bạn yêu cầu, nâng cao nền tảng của chúng tôi, cung cấp nội dung tùy chỉnh và liên lạc với bạn về các dịch vụ của chúng tôi.
                    </div>


                    <div className="mb-4">
                        <h2 className="text-xl font-heading mb-2">3. Cookie và công nghệ theo dõi:</h2>
                        Chúng tôi có thể sử dụng cookie, đèn hiệu web, pixel theo dõi và các công nghệ theo dõi khác để thu thập và lưu trữ thông tin của bạn, nhằm cải thiện trải nghiệm trực tuyến của bạn cũng như để hiểu hoạt động và xu hướng của nền tảng.
                    </div>


                    <div className="mb-4">
                        <h2 className="text-xl font-heading mb-2">4. Chia sẻ thông tin:</h2>
                        Chúng tôi có thể chia sẻ thông tin của bạn với các nhà cung cấp dịch vụ bên thứ ba đáng tin cậy khi cần thiết để họ thay mặt chúng tôi thực hiện các dịch vụ. Chúng tôi không bán hoặc chia sẻ thông tin của bạn với bên thứ ba vì mục đích tiếp thị của riêng họ mà không có sự đồng ý của bạn.
                    </div>


                    <div className="mb-4">
                        <h2 className="text-xl font-heading mb-2">  5. Bảo mật dữ liệu:</h2>
                        Chúng tôi thực hiện nhiều biện pháp bảo mật khác nhau để duy trì sự an toàn cho thông tin cá nhân của bạn, bao gồm cả mạng bảo mật và mã hóa.
                    </div>


                    <div className="mb-4">
                        <h2 className="text-xl font-heading mb-2"> 6. Quyền riêng tư của trẻ em:</h2>
                        Nền tảng của chúng tôi không dành cho các cá nhân dưới 13 tuổi sử dụng. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em dưới 13 tuổi.
                    </div>



                    <div className="mb-4">
                        <h2 className="text-xl font-heading mb-2"> 7. Những thay đổi đối với Chính sách này:</h2>
                        Đôi khi, chúng tôi có thể cập nhật Chính sách quyền riêng tư này để phản ánh những thay đổi trong thực tiễn của chúng tôi. Mọi thay đổi sẽ được đăng trên trang này với ngày sửa đổi được cập nhật.

                    </div>




                    <div className="mb-4">
                        <h2 className="text-xl font-heading mb-2"> 8. Liên hệ:</h2>
                        Nếu bạn có thắc mắc hoặc quan ngại về Chính sách quyền riêng tư này, vui lòng liên hệ với chúng tôi tại contact@laginow.com.
                    </div>




                </div>
            }









            <p>Updated 3/10/2023</p>
        </div>
    );
};

export default PrivacyPolicy;
