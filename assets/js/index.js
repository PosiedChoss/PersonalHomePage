// 主题切换功能
document.addEventListener('DOMContentLoaded', function () {
    const themeSwitcher = document.querySelector('.theme-switcher');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const html = document.documentElement;

    // 获取存储的主题设置
    const savedTheme = localStorage.getItem('theme') || 'system';

    // 应用存储的主题
    applyTheme(savedTheme);

    // 设置活动按钮
    themeButtons.forEach(btn => {
        if (btn.dataset.theme === savedTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 主题切换事件
    themeSwitcher.addEventListener('click', function (e) {
        if (e.target.classList.contains('theme-btn') ||
            e.target.parentElement.classList.contains('theme-btn')) {

            const btn = e.target.classList.contains('theme-btn') ?
                e.target : e.target.parentElement;

            const selectedTheme = btn.dataset.theme;

            // 更新活动按钮
            themeButtons.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');

            // 应用新主题
            applyTheme(selectedTheme);

            // 保存主题设置
            localStorage.setItem('theme', selectedTheme);
        }
    });

    // 监听系统主题变化
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', e => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'system') {
            applyTheme('system');
        }
    });

    // 应用主题的函数
    function applyTheme(theme) {
        if (theme === 'system') {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                html.dataset.theme = 'dark';
            } else {
                html.removeAttribute('data-theme');
            }
        } else if (theme === 'dark') {
            html.dataset.theme = 'dark';
        } else {
            html.removeAttribute('data-theme');
        }
    }

    // 添加悬停效果延迟，提升性能
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
        });
    });


    // 处理头像图片加载失败的情况
    const avatarImg = document.querySelector('.avatar img');
    const avatarPlaceholder = document.querySelector('.avatar-placeholder');

    // 隐藏占位符（默认情况）
    avatarPlaceholder.style.display = 'none';

    // 如果图片加载失败，显示占位符
    avatarImg.addEventListener('error', function () {
        this.style.display = 'none';
        avatarPlaceholder.style.display = 'flex';
    });

    // 如果图片加载成功，隐藏占位符
    avatarImg.addEventListener('load', function () {
        avatarPlaceholder.style.display = 'none';
    });

    // 检查图片是否已经加载完成（从缓存中）
    if (avatarImg.complete && avatarImg.naturalHeight === 0) {
        avatarImg.dispatchEvent(new Event('error'));
    }

});