'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const TermsAndConditions = () => {

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
                <h1 className="text-2xl font-heading mb-4">Terms and Conditions</h1>

                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2">1. Acceptance of Terms:</h2>
                    <p>By accessing and using Lagi Now (the Website), you agree to abide by the following Terms and Conditions (the “Terms”). If you do not agree with these Terms, you should discontinue use of the Website immediately.</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2">2. User Account:</h2>
                    To post reviews or access certain features of the Website, you will need to sign in using a Google account. By signing in through Google, you authorize us to access and use your Google email address for the sole purpose of facilitating the creation of your account on Lagi Now. You are solely responsible for maintaining the confidentiality of your account and for the activity that occurs on your account.
                </div>


                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2">3. User Conduct:</h2>
                    You agree to use the Website in a manner consistent with all applicable laws and regulations of Vietnam. You are solely responsible for all content that you upload, post, email, or otherwise transmit via the Website.
                </div>


                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2">  4. User Content:</h2>
                    You retain all ownership rights to the content you post on the Website. However, by submitting content, you hereby grant Lagi Now a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media.
                </div>


                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2">  5. Moderation:</h2>
                    Lagi Now reserves the right, but is not obligated, to monitor, edit, or remove any activity or content. Lagi Now takes no responsibility and assumes no liability for any content posted by you or any third party.
                </div>


                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2">  6. Copyright Complaints:</h2>
                    If you believe that your work has been copied in a way that constitutes copyright infringement, please contact us via contact@laginow.com
                </div>



                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2">  7. Limitation of Liability:</h2>
                    In no event shall Lagi Now, its officers, directors, employees, or agents, be liable to you for any direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any errors, mistakes, or inaccuracies of content, personal injury or property damage, of any nature whatsoever, resulting from your access to and use of our Website.
                </div>




                <div className="mb-4">
                    <h2 className="text-xl font-heading mb-2">    8. General:</h2>
                    These Terms constitute the entire agreement between you and Lagi Now concerning your use of the Website. Lagi Now reserves the right to amend these Terms at any time and without notice.
                </div>




            </div> : 
            <div className="py-6">
            <h1 className="text-2xl font-heading mb-4">Các điều khoản và điều kiện</h1>

            <div className="mb-4">
                <h2 className="text-xl font-heading mb-2">1. Chấp nhận các điều khoản:</h2>
                <p>Bằng cách truy cập và sử dụng Lagi Now (Trang web), bạn đồng ý tuân theo các Điều khoản và Điều kiện sau đây (“Điều khoản”). Nếu bạn không đồng ý với các Điều khoản này, bạn nên ngừng sử dụng Trang web ngay lập tức.</p>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-heading mb-2">2. Tài khoản người dùng:</h2>
                Để đăng đánh giá hoặc truy cập một số tính năng nhất định của Trang web, bạn cần phải đăng nhập bằng tài khoản Google. Bằng cách đăng nhập thông qua Google, bạn cho phép chúng tôi truy cập và sử dụng địa chỉ email Google của bạn cho mục đích duy nhất là tạo điều kiện thuận lợi cho việc tạo tài khoản của bạn trên Lagi Now. Bạn hoàn toàn chịu trách nhiệm duy trì tính bảo mật của tài khoản của mình và về hoạt động xảy ra trên tài khoản của bạn.
            </div>


            <div className="mb-4">
                <h2 className="text-xl font-heading mb-2">3. Hành vi của người dùng:</h2>
                Bạn đồng ý sử dụng Trang web theo cách phù hợp với tất cả các luật và quy định hiện hành của Việt Nam. Bạn hoàn toàn chịu trách nhiệm về tất cả nội dung mà bạn tải lên, đăng, gửi email hoặc truyền tải qua Trang web.
            </div>


            <div className="mb-4">
                <h2 className="text-xl font-heading mb-2">4. Nội dung người dùng:</h2>
                Bạn giữ mọi quyền sở hữu đối với nội dung bạn đăng trên Trang web. Tuy nhiên, bằng cách gửi nội dung, bạn cấp cho Lagi Now quyền không độc quyền, miễn phí bản quyền, vĩnh viễn, không thể hủy bỏ và hoàn toàn có thể được cấp phép lại để sử dụng, tái tạo, sửa đổi, điều chỉnh, xuất bản, dịch, tạo các tác phẩm phái sinh từ, phân phối và hiển thị nội dung như vậy trên khắp thế giới trong bất kỳ phương tiện truyền thông nào.
            </div>


            <div className="mb-4">
                <h2 className="text-xl font-heading mb-2"> 5. Kiểm duyệt:</h2>
                Lagi Now có quyền, nhưng không bắt buộc, giám sát, chỉnh sửa hoặc xóa bất kỳ hoạt động hoặc nội dung nào. Lagi Now không chịu trách nhiệm và không chịu trách nhiệm pháp lý đối với bất kỳ nội dung nào do bạn hoặc bất kỳ bên thứ ba nào đăng tải.
            </div>


            <div className="mb-4">
                <h2 className="text-xl font-heading mb-2">6. Khiếu nại bản quyền:</h2>
                Nếu bạn cho rằng tác phẩm của mình đã bị sao chép theo cách cấu thành hành vi vi phạm bản quyền, vui lòng liên hệ chúng tôi qua email: contact@laginow.com
            </div>



            <div className="mb-4">
                <h2 className="text-xl font-heading mb-2"> 7. Giới hạn trách nhiệm pháp lý:</h2>
                Trong mọi trường hợp, Lagi Now, cán bộ, giám đốc, nhân viên hoặc đại lý của nó sẽ không chịu trách nhiệm với bạn về mọi thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt, trừng phạt hoặc do hậu quả phát sinh từ bất kỳ sai sót, nhầm lẫn hoặc không chính xác nào về nội dung, thông tin cá nhân. thương tích hoặc thiệt hại về tài sản, dưới bất kỳ hình thức nào, do việc bạn truy cập và sử dụng Trang web của chúng tôi.
            </div>




            <div className="mb-4">
                <h2 className="text-xl font-heading mb-2"> 8. Tổng quát:</h2>
                Các Điều khoản này cấu thành toàn bộ thỏa thuận giữa bạn và Lagi Now liên quan đến việc bạn sử dụng Trang web. Lagi Now có quyền sửa đổi các Điều khoản này bất cứ lúc nào mà không cần thông báo.
            </div>




        </div>
            }
            

            






            <p>Updated 3/10/2023</p>
        </div>
    );
};

export default TermsAndConditions;
