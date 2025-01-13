// banner close button 

function closeBanner() {
  document.getElementById('banner').style.display = 'none';
}





// search bar functionality but only at one html not other

// Search icon click handler
$('#search-icon1').click(function() {
    var searchTerm = $('#search-input1').val().trim().toLowerCase();

    // If search term is empty, show notification and do nothing else
    if (searchTerm === '') {
        showNotification('Please enter anything');
        return;
    }

    // Redirect to index.html with search term as query parameter
    window.location.href = 'index.html?search=' + encodeURIComponent(searchTerm);
});

$(document).ready(function() {
    // Function to toggle visibility of ads, buttons, and banner
    function toggleVisibility(show) {
        if (show) {
            $('.Ads, .buttons-1, .banner').show();
        } else {
            $('.Ads, .buttons-1, .banner').hide();
        }
    }

    // Function to handle search
    function performSearch(searchTerm) {
        toggleVisibility(false); // Hide ads, buttons, and banner

        // Remove previous error messages and search results
        $('.no-results').remove();
        $('.search-again').remove();
        $('#search-results').text('').hide();

        // Display search results or message
        var found = false;
        var visiblePosts = 0;
        $('.box-1').each(function() {
            var boxText = $(this).find('.box-text').text().toLowerCase();
            if (boxText.includes(searchTerm)) {
                $(this).show();
                visiblePosts++;
                found = true;
                if (visiblePosts > 8) {
                    $(this).hide(); // Show only first 10 matching posts
                }
            } else {
                $(this).hide();
            }
        });

        // Show search results line
        if (found) {
            $('#search-results').text('Search Results for: ' + searchTerm).show();
        } else {
            $('#postBox').append('<p class="no-results">No results found for "' + searchTerm + '".</p>');
            $('#postBox').append('<p class="search-again white-text">Please hit back on your browser or use the search form again.</p>');
        }

        // Hide pagination and show "Show More" button if more than 10 posts found
        $('.pagination').hide();
        if (visiblePosts > 8) {
            $('.show-more-btn').show();
        } else {
            $('.show-more-btn').hide();
        }
    }

    // Show more button click handler
    $('.show-more-btn').click(function() {
        $(this).hide(); // Hide the button while loading

        // Show loading animation
        $('.loading').show();

        setTimeout(function() {
            $('.loading').hide(); // Hide loading animation

            var hiddenPosts = $('.box-1:hidden');
            hiddenPosts.slice(0, 8).show(); // Show next 10 hidden posts directly
            if (hiddenPosts.length > 8) {
                $('.show-more-btn').show(); // Show show more button if more hidden posts
            } else {
                $('.show-more-btn').hide(); // Hide show more button if no more hidden posts
            }
        }, 1000); // 1 second loading time
    });

    // Function to show notification
    function showNotification(message) {
        $('.notification').remove(); // Remove any existing notification
        $('body').prepend('<div class="notification">' + message + '</div>');
        setTimeout(function() {
            $('.notification').fadeOut(function() {
                $(this).remove();
            });
        }, 3000); // Notification disappears after 3 seconds
    }

    // Get search term from URL query parameter
    var urlParams = new URLSearchParams(window.location.search);
    var searchTerm = urlParams.get('search');
    if (searchTerm) {
        performSearch(searchTerm.toLowerCase());
    }
});









// hamburger menu
 
  $(document).ready(function() {
    $('#menu-bar2').hide();

    function openMenu() {
      $('#menu-bar2').css('left', '-290px').show().animate({
        left: '0px'
      }, 200, function() {
        $('body').addClass('menu-open');
        $('#close-btn').fadeIn(00);
      });
    }

    function closeMenu() {
      $('#close-btn').fadeOut(200); // Start fading out close button before menu animation
      $('#menu-bar2').animate({
        left: '-290px'
      }, 200, function() {
        $(this).hide();
        $('body').removeClass('menu-open');
      });
    }

    $('#menu-bar1').click(function() {
      if ($('#menu-bar2').is(':visible')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    $('#close-btn, #overlay').click(function() {
      closeMenu();
    });

    // Dropdown toggle functionality
    $('.fa-angle-down').click(function() {
      $(this).closest('.list-icons').next('.dropdown').slideToggle();
      $(this).toggleClass('open'); // Optionally toggle a class to change icon direction
    });

    // Nested dropdown toggle functionality for year-2
    $('#year-2').click(function() {
      $('#year-menu2').slideToggle();
      $(this).find('.fa-angle-down').toggleClass('open');
    });
    // Optional: Close all dropdowns when menu is closed
    $('#close-btn, #overlay').click(function() {
      $('.dropdown').slideUp();
      $('.fa-angle-down').removeClass('open');
    });
  });







    
 // Drop-down for desktop 
 
 document.querySelectorAll('.fa-chevron-down').forEach(icon => {
    icon.addEventListener('click', function(event) {
        event.stopPropagation();

        // Close all dropdowns
        document.querySelectorAll('.dropdown1').forEach(dropdown => {
            dropdown.classList.remove('open');
        });

        // Open the clicked dropdown
        const dropdown = this.parentElement.nextElementSibling;
        dropdown.classList.toggle('open');
    });
});

window.addEventListener('click', function(e) {
    if (!e.target.matches('.fa-chevron-down')) {
        document.querySelectorAll('.dropdown1').forEach(dropdown => {
            dropdown.classList.remove('open');
        });
    }
});

    
    
    
    
    
// pagination 

  document.addEventListener('DOMContentLoaded', () => {
    const itemsPerPage = 16;
    const maxVisibleButtons = 2; // Max visible pagination buttons

    const postBox = document.getElementById('postBox');
    const pagination = document.getElementById('pagination');
    const boxes = Array.from(postBox.getElementsByClassName('box-1'));

    const totalPages = Math.ceil(boxes.length / itemsPerPage);

    let currentPage = 1;

    function showPage(page) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;

      boxes.forEach((box, index) => {
        box.style.display = (index >= start && index < end) ? 'block' : 'none';
      });

      // Scroll to top of the page
      window.scrollTo(0, 0);

      // Update pagination
      updatePagination(page);
    }

    function updatePagination(page) {
      pagination.innerHTML = '';

      // Hide pagination if there are fewer or equal items than itemsPerPage
      if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
      } else {
        pagination.style.display = 'flex';
      }

      // Previous button (only show if not on the first page)
      if (page > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerText = 'Previous';
        prevButton.addEventListener('click', () => showPage(page - 1));
        pagination.appendChild(prevButton);
      }

      // First page button
      const firstButton = document.createElement('button');
      firstButton.innerText = '1';
      firstButton.addEventListener('click', () => showPage);
      pagination.appendChild(firstButton);

      // Dots before current page if necessary
      if (page > 2) {
        const dotsStart = document.createElement('button');
        dotsStart.innerText = '...';
        dotsStart.disabled = true;
        pagination.appendChild(dotsStart);
      }

      // Page number buttons
      const startPage = Math.max(2, page - Math.floor(maxVisibleButtons / 2));
      const endPage = Math.min(totalPages - 1, startPage + maxVisibleButtons - 1);

      for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        if (i === page) {
          button.classList.add('active');
        }
        button.addEventListener('click', () => showPage(i));
        pagination.appendChild(button);
      }

      // Dots after current page if necessary
      if (endPage < totalPages - 1) {
        const dotsEnd = document.createElement('button');
        dotsEnd.innerText = '...';
        dotsEnd.disabled = true;
        pagination.appendChild(dotsEnd);
      }

      // Last page button
      const lastButton = document.createElement('button');
      lastButton.innerText = totalPages;
      lastButton.addEventListener('click', () => showPage(totalPages));
      pagination.appendChild(lastButton);

      // Next button (only show if not on the last page)
      if (page < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.innerText = 'Next';
        nextButton.addEventListener('click', () => showPage(page + 1));
        pagination.appendChild(nextButton);
      }

      // Highlight the active page button
      const buttons = pagination.getElementsByTagName('button');
      for (let button of buttons) {
        if (parseInt(button.innerText) === page) {
          button.classList.add('active');
        }
      }
    }

    showPage(currentPage);
  });


// Scrolltoup Get the scroll-to-top icon element

document.addEventListener('DOMContentLoaded', function() {
  const scrollToTopButton = document.getElementById('scrollToTop');

  scrollToTopButton.addEventListener('click', function() {
    // Scroll to the top with smooth animation
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});


// buttons


function navigateToCategory(category) {
  window.location.href = `index.html?category=${category}`;
}

function filterPosts(category) {
  // Hide buttons, ads, and banner
  document.querySelector('.buttons-1').style.display = 'none';
  document.querySelector('.Ads').style.display = 'none';
  document.querySelector('.Ads1').style.display = 'none';
  document.querySelector('.banner').style.display = 'none';

  // Show category name
  document.getElementById('categoryDisplay').style.display = 'block';
  document.getElementById('categoryName').textContent = category;

  // Filter posts
  const posts = document.querySelectorAll('.box-1');
  posts.forEach(post => {
    const categories = JSON.parse(post.getAttribute('data-categories'));
    if (categories.some(cat => cat.toUpperCase() === category.toUpperCase())) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
}

function closeBanner() {
  document.getElementById('banner').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  if (category) {
    filterPosts(category);
  }
});



//comment box

