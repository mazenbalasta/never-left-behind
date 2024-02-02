import { copyrightSign } from "../assets/icons";
import { logo } from "../assets/images";
import { footerLinks, socialMedia } from "../constants";


const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='flex justify-between items-center gap-20 flex-wrap max-lg:flex-col mx-8'>
        <div className='max-container flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap'>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className='text-2xl leading-normal font-medium mt-6 text-white'>
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li
                    className='mt-3 text-base leading-normal text-white-400 hover:text-gray-500'
                    key={link.name}
                  >
                    <a href={link.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center items-center gap-5 mt-8 mx-8'>
        {socialMedia.map((icon) => (
          <div
            className='flex justify-center items-center w-12 h-12 bg-white rounded-full'
            key={icon.alt}
          >
            <img src={icon.src} alt={icon.alt} width={24} height={24} />
          </div>
        ))}
      </div>

      <div className="flex justify-between text-white-400 max-sm:flex-col max-sm:itemes-center mx-8 mt-8">
        <div className="flex flex-1 justify-center items-center gap-2 cursor-pointer">
          <img
            src={copyrightSign}
            alt='copyright sign'
            width={20}
            height={20}
            className='rounded-full m-0'
          />
          <p>Copyright Veterans 'R Us. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
