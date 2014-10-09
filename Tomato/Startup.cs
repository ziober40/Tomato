using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Tomato.Startup))]
namespace Tomato
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
