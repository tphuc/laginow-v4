import { format } from "date-fns";

const nodemailer = require('nodemailer');


export const mailTransporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'contact@laginow.com',
    pass: 'ciiunjdzhfxkdvnz'
  }
});


const locale = 'vi-VN'; // Vietnam locale
const options = {
  timeZone: 'Asia/Ho_Chi_Minh', // Set the time zone to Vietnam
  hour12: false, // Use 24-hour format,
  hour: 'numeric',
  minute: '2-digit',

};


export const htmlOrderTemplate = ({ name, phone, address, businessId, items }) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>Interactive Rollover Image, Trigger newsletter</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <style type="text/css">
.rollover:hover .rollover-first {
  max-height:0px!important;
  display:none!important;
  }
  .rollover:hover .rollover-second {
  max-height:none!important;
  display:inline-block!important;
  }
  .rollover div {
  font-size:0px;
  }
  u + .body img ~ div div {
  display:none;
  }
  #outlook a {
  padding:0;
  }
  span.MsoHyperlink,
span.MsoHyperlinkFollowed {
  color:inherit;
  mso-style-priority:99;
  }
  a.es-button {
  mso-style-priority:100!important;
  text-decoration:none!important;
  }
  a[x-apple-data-detectors] {
  color:inherit!important;
  text-decoration:none!important;
  font-size:inherit!important;
  font-family:inherit!important;
  font-weight:inherit!important;
  line-height:inherit!important;
  }
  .es-desk-hidden {
  display:none;
  float:left;
  overflow:hidden;
  width:0;
  max-height:0;
  line-height:0;
  mso-hide:all;
  }
  .es-button-border:hover > a.es-button {
  color:#ffffff!important;
  }
@media only screen and (max-width:600px) 
{.es-m-p20b { padding-bottom:20px!important } 
.es-m-p20b { padding-bottom:20px!important } .es-m-p20b { padding-bottom:20px!important } 
*[class="gmail-fix"] { display:none!important } 
p, a { line-height:150%!important } 
h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } h4 { font-size:24px!important; text-align:left } 
h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } 
.es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body a { font-size:16px!important } .es-infoblock p, 
.es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover div, .es-m-txt-c .rollover div, .es-m-txt-l .rollover div { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:20px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, 
.es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } }
@media screen and (max-width:9999px) {.rollover:hover .rollover-main { max-height:0px!important } .rollover:hover div img { max-height:none!important } }
</style>
 </head>
 <body class="body" style="width:100%;height:100%;padding:0;Margin:0">
  <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#EFEFEF"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#efefef"></v:fill>
			</v:background>
		<![endif]-->
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#EFEFEF">
     <tr>
      <td valign="top" style="padding:0;Margin:0">

       <table cellpadding="0" cellspacing="0" class="es-header" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
             <tr>
              <td align="left" style="padding:0;Margin:0">
               <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;display:none"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
             <tr>
              <td style="Margin:0;padding-top:40px;padding-right:40px;padding-bottom:30px;padding-left:40px;background-repeat:no-repeat" align="left">
               <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td valign="top" align="center" style="padding:0;Margin:0;width:520px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-bottom:10px">
                        <h1 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:34px;font-style:normal;font-weight:normal;line-height:41px;color:#333333">
                        Bạn có đơn đặt hàng mới
                        </h1>
                      </td>
                     </tr>
                     <tr>
                      <td class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-bottom:10px">
                        <p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#666666;font-size:14px">
                        ${name}
                        </p>
                      </td>
                     </tr>
                     <tr>
                      <td class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-bottom:10px">
                        <p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#666666;font-size:14px">
                         ${phone}
                        </p>
                      </td>
                     </tr>
                     <tr>
                      <td class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-bottom:10px">
                        <p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#666666;font-size:14px">
                       ${address}
                        </p>
                      </td>
                     </tr>
                    
                     <tr>
                      <td class="es-m-txt-c" align="center" style="padding:0;Margin:0">
                      <span class="es-button-border" style="border-style:solid;border-color:#9A7BAA;background:#45818e;border-width:0;display:inline-block;border-radius:8px;width:auto">
                      <a href="https://laginow.com/" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;padding:10px 20px;display:inline-block;background:#45818e;border-radius:8px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #45818e">
                      XEM TREN LAGI NOW
                      </a></span></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
            
             ${items?.map((orderItem: any) => `
             <tr>
            <td style="padding: 10px; text-align: left;"><img src="${orderItem?.product?.images?.url}" alt="Item Image" style="max-width: 100px; max-height: 100px;"></td>
            <td style="padding: 10px; text-align: left;">
                <h3 style="margin: 0; font-size: 18px;">${orderItem?.product?.name}</h3>
                <p style="margin: 0; font-size: 14px;">x${orderItem?.quantity}</p>
                <p style="margin: 0; font-size: 14px;">x${orderItem?.price}</p>
            </td>
        </tr>
             `)}

             <tr style="height:20px">
              
         </tr>
       </table>
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center" role="none">
             <tr>
              <td align="left" style="Margin:0;padding-right:20px;padding-left:20px;padding-bottom:30px;padding-top:30px">
               <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td valign="top" align="center" style="padding:0;Margin:0;padding-top:15px;width:535px">
                   <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#3d85c6" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#3d85c6" role="none">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;display:none"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  </div>
 </body>
</html>
`}







export const emailTemplate = ({ time, name, phone, address, businessId, items }) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        p {
          margin: 0px;
          padding: 0px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #222222;
            color: #fff;
            text-align: center;
            padding: 10px;
        }
        .customer-info {
            margin-top: 20px;
        }
        .order-items {
          gap: 5px;
          margin-top: 20px;
        }
        .item {
            display: flex;
            margin-bottom:5px;
            gap: 5px;
        }
        .item img {
            max-width: 100px;
            max-height: 100px;
            min-width: 100px;
            min-height: 100px;
        }

        .order-product {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .order-button {
            text-align: center;
            margin-top: 20px;
        }
        .order-button a {
            background-color: #222222;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Bạn có đơn hàng mới trên Lagi Now</h1>
        </div>
        <div class="customer-info">
            <h2>Thông tin đơn hàng</h2>
            <p>${new Date(time)?.toLocaleString(locale, { timeStyle: 'short', dateStyle: 'medium' })}</p>
            <p><strong></strong> ${name}</p>
            <p><strong></strong> ${phone}</p>
            <p>${address}</p>
        </div>

        <div class="order-items">
            <h2>SẢN PHẨM</h2>

            ${items?.map((orderItem: any) => `<div class="item">
            <img src="${orderItem?.product?.images?.url}" alt="">
            <div style="padding:5px;">
            <p>${orderItem?.product?.name}</p>
            <p>x${orderItem?.quantity}</p>
            <p>${orderItem?.price}</p>
            </div>
        </div>`)}
           
           
        </div>
        <div class="order-button">
            <a href="https://laginow.com">Trang quản lí đơn hàng</a>
        </div>
    </div>
</body>
</html>`




export const emailInvitationTemplate = ({ ownerName, businessName, inviteId }) => `
<!<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        p {
          margin: 0px;
          padding: 0px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #222222;
            color: white;
            text-align: center;
            padding: 10px;
        }
        .customer-info {
            margin-top: 20px;
        }
        .order-items {
          gap: 5px;
          margin-top: 20px;
        }
        .item {
            display: flex;
            margin-bottom:5px;
            gap: 5px;
        }
        .item img {
            max-width: 100px;
            max-height: 100px;
            min-width: 100px;
            min-height: 100px;
        }

        .order-product {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .order-button {
            text-align: center;
            margin-top: 20px;
        }
        .order-button a {
            background-color: #222222;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
      <h4> ${ownerName} đã gửi lời mời cho bạn làm đồng quản lí trang ${businessName} </h4>
    </div>
    <div class="order-button">
      <a href="https://laginow.com/invite/${inviteId}">Chấp nhận</a>
    </div>
    </div>
</body>
</html>`